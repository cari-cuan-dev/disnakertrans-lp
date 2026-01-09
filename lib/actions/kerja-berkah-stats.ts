'use server'

import { kerjaBerkahPrisma } from "@/lib/kerjaberkah-prisma"
import { prisma } from "@/lib/prisma"

export async function getKerjaBerkahStats() {
  try {
    // Count active vacancies
    const vacanciesCount = await kerjaBerkahPrisma.vacancies.count({
      where: {
        deleted_at: null, // Only count non-deleted vacancies
      },
    })

    // Count active workers
    const workersCount = await kerjaBerkahPrisma.workers.count({
      where: {
        deleted_at: null, // Only count non-deleted workers
      },
    })

    // Count visitors for different time periods
    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)

    const monthStart = new Date()
    monthStart.setDate(1)
    monthStart.setHours(0, 0, 0, 0)

    const yearStart = new Date()
    yearStart.setMonth(0)
    yearStart.setDate(1)
    yearStart.setHours(0, 0, 0, 0)

    const todayVisitorsCount = await prisma.analytic_visitors.count({
      where: {
        created_at: {
          gte: todayStart,
        }
      }
    })

    const monthVisitorsCount = await prisma.analytic_visitors.count({
      where: {
        created_at: {
          gte: monthStart,
        }
      }
    })

    const yearVisitorsCount = await prisma.analytic_visitors.count({
      where: {
        created_at: {
          gte: yearStart,
        }
      }
    })

    const totalVisitorsCount = await prisma.analytic_visitors.count({})

    return {
      vacancies: vacanciesCount,
      workers: workersCount,
      visitors: {
        today: todayVisitorsCount,
        month: monthVisitorsCount,
        year: yearVisitorsCount,
        total: totalVisitorsCount
      }
    }
  } catch (error) {
    console.error('Error fetching Kerja Berkah stats:', error)
    throw error
  }
}