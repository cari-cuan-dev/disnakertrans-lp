import { Briefcase, Users } from "lucide-react"

const stats = [
  {
    label: "Lowongan Kerja",
    value: "1,250+",
    icon: Briefcase,
    color: "purple",
  },
  {
    label: "Pencari Pekerjaan",
    value: "5,000+",
    icon: Users,
    color: "blue",
  },
]

const visitorStats = [
  {
    label: "Hari Ini",
    value: "348",
    color: "purple",
  },
  {
    label: "Bulan Ini",
    value: "12,540",
    color: "blue",
  },
  {
    label: "Tahun Ini",
    value: "450,200",
    color: "purple",
  },
  {
    label: "Keseluruhan",
    value: "1,250,450",
    color: "blue",
  },
]

export default function KerjaBerkahStats() {
  return (
    <div className="space-y-8">
      {/* Job Stats */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Statistik Lowongan & Pencari</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            const bgColor = stat.color === "purple" ? "bg-purple-50" : "bg-blue-50"
            const textColor = stat.color === "purple" ? "text-purple-600" : "text-blue-600"
            const borderColor = stat.color === "purple" ? "border-purple-200" : "border-blue-200"

            return (
              <div key={index} className={`${bgColor} p-8 rounded-lg border ${borderColor}`}>
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium mb-2">{stat.label}</p>
                    <p className={`text-4xl font-bold ${textColor}`}>{stat.value}</p>
                  </div>
                  <Icon className={`${textColor} flex-shrink-0`} size={32} />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Visitor Stats */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Statistik Pengunjung</h3>
        <div className="grid md:grid-cols-4 gap-6">
          {visitorStats.map((stat, index) => {
            const bgColor = stat.color === "purple" ? "bg-purple-600" : "bg-blue-600"

            return (
              <div
                key={index}
                className={`${bgColor} text-white p-6 rounded-lg text-center hover:shadow-lg transition-shadow`}
              >
                <p className="text-sm font-medium text-white/80 mb-2">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
