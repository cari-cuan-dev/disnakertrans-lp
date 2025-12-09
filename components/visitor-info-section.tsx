"use client"

import { Info, MapPin, Calendar, Users } from "lucide-react"

const info = [
  {
    icon: Calendar,
    title: "Jam Operasional",
    description: "Senin - Jumat: 08:00 - 17:00 WIB\nSabtu - Minggu: Tutup",
  },
  {
    icon: MapPin,
    title: "Lokasi Kantor",
    description: "Jl. Semangat No. 123\nPalangka Raya, Kalimantan Tengah",
  },
  {
    icon: Users,
    title: "Info Pengunjung",
    description: "Kunjungan oleh janji temu (Gawai Kerja Berkah)",
  },
  {
    icon: Info,
    title: "Kontak",
    description: "Telp: (0536) 123-4567\nEmail: info@disnakertrans-kalteng.go.id",
  },
]

export default function VisitorInfoSection() {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Info Pengunjung</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {info.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200/30 hover:border-purple-300 transition-all"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 whitespace-pre-line">{item.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
