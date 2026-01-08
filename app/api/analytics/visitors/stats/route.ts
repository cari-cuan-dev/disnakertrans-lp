import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// Endpoint untuk mendapatkan statistik pengunjung utama
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const year = parseInt(searchParams.get('year') || new Date().getFullYear().toString());
    
    // Tahun sebelumnya
    const previousYear = year - 1;
    
    // Menghitung total pengunjung unik di tahun berjalan (jumlah IP unik)
    const totalVisitorsThisYearTmp = await prisma.analytic_visitors.findMany({
      distinct: 'ip',
      where: {
        created_at: {
          gte: new Date(`${year}-01-01`),
          lt: new Date(`${year + 1}-01-01`),
        }
      },
      select: {
        ip: true
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