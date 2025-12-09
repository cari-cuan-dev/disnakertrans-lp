"use client"

import { FileText, Download, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const documents = [
  { title: "Panduan Layanan 2023", type: "PDF", size: "2.4 MB" },
  { title: "Laporan Kinerja Tahunan", type: "PDF", size: "3.1 MB" },
  { title: "Tata Cara Pengajuan Sertifikasi", type: "PDF", size: "1.8 MB" },
]

export default function DocumentationSection() {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-r from-purple-50 via-transparent to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Dokumentasi</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {documents.map((doc, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText size={24} className="text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-purple-600 transition-colors">
                    {doc.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2">
                    {doc.type} • {doc.size}
                  </p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-medium text-gray-600">Unduh</span>
                <Download size={16} className="text-purple-600 group-hover:translate-y-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/dokumentasi">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              Lihat Semua Dokumentasi <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
