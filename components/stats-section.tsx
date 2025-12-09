"use client"

import { Users, Eye, TrendingUp } from "lucide-react"

const stats = [
  {
    label: "Total Pengunjung",
    value: "224,262",
    subvalue: "21 sedang online",
    icon: Users,
  },
  {
    label: "Total Kunjungan",
    value: "1,225,492",
    icon: Eye,
  },
  {
    label: "Pertumbuhan YoY",
    value: "+45%",
    subvalue: "dibanding tahun lalu",
    icon: TrendingUp,
  },
]

export default function StatsSection() {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-r from-purple-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center text-balance">
          Statistik Kunjungan
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {stats.map((stat, index) => {
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
