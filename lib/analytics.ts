import { prisma } from '@/lib/prisma';

// Interface untuk data statistik pengunjung
export interface VisitorStats {
  totalVisitors: number;
  totalVisits: number;
  growthRate: number;
  yearlyData: YearlyStat[];
}

export interface YearlyStat {
  year: number;
  visitors: number;
  visits: number;
  growthPercentage?: number;
}

/**
 * Fungsi untuk menghitung statistik pengunjung
 */
export async function getVisitorStatistics(): Promise<VisitorStats> {
  try {
    // Ambil data tahunan
    const yearlyDataRaw = await prisma.$queryRaw<Array<{
      year: number;
      unique_visitors: bigint;
      total_visits: bigint;
    }>>`
      SELECT 
        EXTRACT(YEAR FROM created_at) as year,
        COUNT(DISTINCT ip) as unique_visitors,
        COUNT(*) as total_visits
      FROM analytic_visitors
      GROUP BY EXTRACT(YEAR FROM created_at)
      ORDER BY year
    `;

    // Konversi hasil ke format yang diinginkan
    const yearlyData: YearlyStat[] = yearlyDataRaw.map((row, index) => {
      const currentYearData = Number(row.unique_visitors);
      const currentYearVisits = Number(row.total_visits);
      
      // Hitung pertumbuhan jika bukan tahun pertama
      let growthPercentage: number | undefined;
      if (index > 0) {
        const previousYearData = yearlyData[index - 1].visitors;
        if (previousYearData > 0) {
          growthPercentage = ((currentYearData - previousYearData) / previousYearData) * 100;
        }
      }

      return {
        year: Number(row.year),
        visitors: currentYearData,
        visits: Number(row.total_visits),
        growthPercentage
      };
    });

    // Total keseluruhan
    const totalVisitors = yearlyData.reduce((sum, year) => sum + year.visitors, 0);
    const totalVisits = yearlyData.reduce((sum, year) => sum + year.visits, 0);
    
    // Ambil pertumbuhan tahun terakhir jika tersedia
    const growthRate = yearlyData.length > 0 
      ? yearlyData[yearlyData.length - 1].growthPercentage || 0 
      : 0;

    return {
      totalVisitors,
      totalVisits,
      growthRate,
      yearlyData
    };
  } catch (error) {
    console.error('Error getting visitor statistics:', error);
    throw new Error('Failed to get visitor statistics');
  }
}

/**
 * Fungsi untuk menghitung statistik harian
 */
export async function getDailyStatistics(date: Date): Promise<{
  visitors: number;
  visits: number;
}> {
  try {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const [visitors, visits] = await Promise.all([
      prisma.analytic_visitors.count({
        distinct: 'ip',
        where: {
          created_at: {
            gte: startOfDay,
            lt: endOfDay,
          }
        }
      }),
      prisma.analytic_visitors.count({
        where: {
          created_at: {
            gte: startOfDay,
            lt: endOfDay,
          }
        }
      })
    ]);

    return {
      visitors,
      visits
    };
  } catch (error) {
    console.error('Error getting daily statistics:', error);
    throw new Error('Failed to get daily statistics');
  }
}

/**
 * Fungsi untuk menghitung statistik bulanan
 */
export async function getMonthlyStatistics(month: number, year: number): Promise<{
  visitors: number;
  visits: number;
}> {
  try {
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0, 23, 59, 59, 999);

    const [visitors, visits] = await Promise.all([
      prisma.analytic_visitors.count({
        distinct: 'ip',
        where: {
          created_at: {
            gte: startOfMonth,
            lt: endOfMonth,
          }
        }
      }),
      prisma.analytic_visitors.count({
        where: {
          created_at: {
            gte: startOfMonth,
            lt: endOfMonth,
          }
        }
      })
    ]);

    return {
      visitors,
      visits
    };
  } catch (error) {
    console.error('Error getting monthly statistics:', error);
    throw new Error('Failed to get monthly statistics');
  }
}