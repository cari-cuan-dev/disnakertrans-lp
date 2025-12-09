"use client"

import { ArrowRight, Users, FileCheck, Briefcase, Award } from "lucide-react"

const quickLinks = [
  {
    icon: Briefcase,
    title: "Portal Lowongan Kerja",
    description: "Akses informasi lowongan kerja terbaru",
  },
  {
    icon: Award,
    title: "Layanan Sertifikasi",
    description: "Sertifikasi kompetensi dan keahlian",
  },
  {
    icon: FileCheck,
    title: "PPID (Transparansi)",
    description: "Akses informasi publik Disnakertrans",
  },
  {
    icon: Users,
    title: "Kerja Berkah",
    description: "Program pemberdayaan tenaga kerja",
  },
]

export default function QuickAccessSection() {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-balance">Akses Cepat</h2>
          <p className="text-purple-100 text-lg">Jelajahi layanan utama Disnakertrans Kalteng</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((link, index) => {
            const Icon = link.icon
            return (
              <div
                key={index}
                className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/40 rounded-xl p-6 cursor-pointer transition-all"
              >
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors">
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="font-bold text-white mb-2 group-hover:text-purple-100 transition-colors">
                  {link.title}
                </h3>
                <p className="text-sm text-purple-100 group-hover:text-white/90 transition-colors">
                  {link.description}
                </p>
                <div className="mt-4 flex items-center text-white/70 group-hover:text-white transition-colors">
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
