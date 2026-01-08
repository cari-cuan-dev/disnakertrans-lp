"use client"

import { useState, useEffect } from "react"
import { Users, Eye, TrendingUp } from "lucide-react"

interface StatsData {
  totalVisitors: number;
  totalVisits: number;
  growthRate: number;
}

export default function StatsSection() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`/api/analytics/visitors/stats?year=${currentYear}`);
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        } else {
          console.error('Failed to fetch stats:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [currentYear]);

  const statsData = stats ? [
    {
      label: "Total Pengunjung",
      value: stats.totalVisitors.toLocaleString(),
      // subvalue: `${Math.floor(Math.random() * 30) + 1} sedang online`, // Placeholder - Anda bisa menggantinya dengan data real
      icon: Users,
    },
    {
      label: "Total Kunjungan",
      value: stats.totalVisits.toLocaleString(),
      icon: Eye,
    },
    {
      label: "Pertumbuhan YoY",
      value: `${stats.growthRate >= 0 ? '+' : ''}${stats.growthRate.toFixed(2)}%`,
      subvalue: "dibanding tahun lalu",
      icon: TrendingUp,
    },
  ] : [
    {
      label: "Total Pengunjung",
      value: "0",
      subvalue: "0 sedang online",
      icon: Users,
    },
    {
      label: "Total Kunjungan",
      value: "0",
      icon: Eye,
    },
    {
      label: "Pertumbuhan YoY",
      value: "0.00%",
      subvalue: "dibanding tahun lalu",
      icon: TrendingUp,
    },
  ];

  if (loading) {
    return (
      <section className="py-12 md:py-20 bg-gradient-to-r from-purple-50 via-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center text-balance">
            Statistik Kunjungan
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="relative group bg-white rounded-2xl p-8 border border-purple-200/50 shadow-md"
              >
                <div className="animate-pulse">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-gray-400 text-sm font-medium mb-2">Memuat...</p>
                      <p className="text-4xl md:text-5xl font-bold text-gray-300">
                        ...
                      </p>
                      <p className="text-gray-300 text-xs mt-2">Memuat data</p>
                    </div>
                    <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                      <div className="bg-gray-300 rounded w-6 h-6" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-20 bg-gradient-to-r from-purple-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center text-balance">
          Statistik Kunjungan
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {statsData.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="relative group bg-white rounded-2xl p-8 border border-purple-200/50 hover:border-purple-300 shadow-md hover:shadow-xl transition-all duration-300"
              >
                {/* Decorative gradient background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-gray-600 text-sm font-medium mb-2">{stat.label}</p>
                      <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                        {stat.value}
                      </p>
                      {stat.subvalue && <p className="text-gray-500 text-xs mt-2">{stat.subvalue}</p>}
                    </div>
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg flex items-center justify-center">
                      <Icon size={24} className="text-purple-600" />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
