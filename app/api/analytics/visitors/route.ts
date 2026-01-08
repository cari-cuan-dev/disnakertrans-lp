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
    const { page_url, ip_address } = await request.json();

    // Jika IP tidak diterima dari client, ambil dari header server
    const clientIP = (ip_address || request.headers.get('x-forwarded-for')?.split(',')[0]) ?? 'unknown';
    const country = await getCountryFromIP(clientIP);

    // Simpan data kunjungan ke database
    const newVisitorRecord = await prisma.analytic_visitors.create({
      data: {
        ip: clientIP,
        page_url: page_url,
        country: country,
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
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const pageUrl = searchParams.get('pageUrl');

    let whereClause: any = {};

    if (startDate || endDate) {
      whereClause.created_at = {};
      if (startDate) {
        whereClause.created_at.gte = new Date(startDate);
      }
      if (endDate) {
        whereClause.created_at.lte = new Date(endDate);
      }
    }

    if (pageUrl) {
      whereClause.page_url = pageUrl;
    }

    // Dapatkan total kunjungan
    const totalVisits = await prisma.analytic_visitors.count({
      where: whereClause,
    });

    // Dapatkan pengunjung unik
    const uniqueVisitors = await prisma.analytic_visitors.findMany({
      where: whereClause,
      distinct: ['ip'],
    });

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

    let uv = uniqueVisitors.length;

    return NextResponse.json({
      totalVisits,
      uv,
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