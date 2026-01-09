import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Interface untuk data visitor analytics
export interface VisitorAnalytics {
  id: string;
  ip: string;
  page_url: string;
  country: string | null;
  created_at: string;
}

// Fungsi untuk mendapatkan negara dari IP (Anda bisa menggunakan GeoIP service)
async function getCountryFromIP(ip: string): Promise<string | null> {
  try {
    // Ini adalah implementasi sederhana.
    // Untuk produksi, Anda sebaiknya menggunakan:
    // - Layanan GeoIP seperti IP-API (dengan account)
    // - Library offline seperti geoip-lite
    // - Atau implementasi custom dengan database GeoIP

    // Skip geolokasi untuk lokalhost
    if (!ip || ip === 'unknown' || ip === '::1' || ip.startsWith('127.')) {
      return 'Localhost';
    }

    // Contoh menggunakan IP-API (anda mungkin perlu rate limiting atau key)
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,isp,org,as,query`, {
      next: { revalidate: 3600 } // Cache response selama 1 jam
    });

    if (!response.ok) {
      // Jangan error karena ini opsional
      return null;
    }

    const data = await response.json();

    if (data && data.status === 'success' && data.country) {
      return data.country;
    }
    return null;
  } catch (error) {
    console.error('Error getting country from IP:', error);
    return null; // Jangan buat error karena ini opsional
  }
}

export async function POST(request: NextRequest) {
  try {
    const { page_url } = await request.json();
    const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown';
    const country = await getCountryFromIP(clientIP);

    // Simpan data kunjungan ke database
    const newVisitorRecord = await prisma.analytic_visitors.create({
      data: {
        ip: clientIP,
        page_url: page_url,
        country: country,
        created_at: new Date()
      },
    });

    return NextResponse.json(
      {
        success: true,
        id: newVisitorRecord.id.toString(),
        message: 'Visitor data recorded successfully'
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error recording visitor data:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to record visitor data'
      },
      { status: 500 }
    );
  }
}

// Endpoint untuk mendapatkan statistik
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get('year');
    const pageUrl = searchParams.get('pageUrl');

    let whereClause: any = {};

    if (year) {
      whereClause.created_at = {
        gte: new Date(`${year}-01-01`),
        lt: new Date(`${Number(year) + 1}-01-01`),
      };
    }

    if (pageUrl) {
      whereClause.page_url = pageUrl;
    }

    // Dapatkan total kunjungan
    const totalVisits = await prisma.analytic_visitors.count({
      where: whereClause,
    });

    // Dapatkan pengunjung unik
    const uniqueVisitorsTmp = await prisma.analytic_visitors.findMany({
      where: whereClause,
      distinct: 'ip',
    });
    
    const uniqueVisitors = uniqueVisitorsTmp.length;

    // Dapatkan kunjungan per negara
    const visitsByCountry = await prisma.analytic_visitors.groupBy({
      by: ['country'],
      where: whereClause,
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
    });

    return NextResponse.json({
      totalVisits,
      uniqueVisitors,
      visitsByCountry,
    });
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    return NextResponse.json(
      { message: 'Failed to fetch analytics data' },
      { status: 500 }
    );
  }
}

// Handler tambahan untuk endpoint statistik pengunjung
export async function getVisitorStats(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const year = parseInt(searchParams.get('year') || new Date().getFullYear().toString());

    // Tahun sebelumnya
    const previousYear = year - 1;

    // Menghitung total pengunjung unik di tahun berjalan
    const totalVisitorsThisYearTmp = await prisma.analytic_visitors.findMany({
      distinct: 'ip',
      where: {
        created_at: {
          gte: new Date(`${year}-01-01`),
          lt: new Date(`${year + 1}-01-01`),
        }
      }
    });
    const totalVisitorsThisYear = totalVisitorsThisYearTmp.length;

    // Menghitung total kunjungan di tahun berjalan
    const totalVisitsThisYear = await prisma.analytic_visitors.count({
      where: {
        created_at: {
          gte: new Date(`${year}-01-01`),
          lt: new Date(`${year + 1}-01-01`),
        }
      }
    });

    // Menghitung total kunjungan di tahun sebelumnya untuk pertumbuhan
    const totalVisitsPreviousYear = await prisma.analytic_visitors.count({
      where: {
        created_at: {
          gte: new Date(`${previousYear}-01-01`),
          lt: new Date(`${previousYear + 1}-01-01`),
        }
      }
    });

    // Hitung persentase pertumbuhan
    let growthRate = 0;
    if (totalVisitsPreviousYear > 0) {
      growthRate = ((totalVisitsThisYear - totalVisitsPreviousYear) / totalVisitsPreviousYear) * 100;
    }

    return NextResponse.json({
      totalVisitors: totalVisitorsThisYear,
      totalVisits: totalVisitsThisYear,
      growthRate: parseFloat(growthRate.toFixed(2))
    });
  } catch (error) {
    console.error('Error fetching visitor stats:', error);
    return NextResponse.json(
      { message: 'Failed to fetch visitor stats' },
      { status: 500 }
    );
  }
}

// Gabungkan handler untuk rute stats
export async function GET_STATS(request: NextRequest) {
  // Cek apakah ini permintaan untuk stats
  const url = new URL(request.url);
  if (url.pathname.includes('/stats')) {
    return getVisitorStats(request);
  } else {
    return GET(request);
  }
}