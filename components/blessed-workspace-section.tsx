"use client"

import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BlessedWorkspaceSection() {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-balance">
              Bilik Kerja Berkah Kalteng
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Program inovatif yang menghubungkan pencari kerja dengan peluang lapangan kerja yang tersedia. Kami
              berkomitmen untuk menciptakan pekerjaan yang berkelanjutan dan bermakna bagi masyarakat Kalimantan Tengah.
            </p>

            <div className="space-y-4 mb-8">
              {[
                "Akses langsung ke informasi lowongan kerja terbaru",
                "Program pelatihan dan pengembangan kompetensi gratis",
                "Dukungan penuh dari tim profesional kami",
                "Jaringan dengan berbagai industri dan perusahaan",
              ].map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle2 size={24} className="text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
              Daftar Sekarang
            </Button>
          </div>

          {/* Right Image */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 flex items-center justify-center min-h-96">
            <img
              src="/blessed-workspace-employment-program.jpg"
              alt="Bilik Kerja Berkah"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
