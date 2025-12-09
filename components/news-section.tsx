"use client"

import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const newsItems = [
  {
    id: 1,
    title: "Kepala Disnakertrans Lepas 40 Peserta Magang ke Jepang",
    category: "Berita",
    date: "25 November 2023",
    image: "/magang-jepang-program-internasional.jpg",
  },
  {
    id: 2,
    title: "Program Pelatihan Gratis untuk Meningkatkan Skill Kerja",
    category: "Pengumuman",
    date: "24 November 2023",
    image: "/pelatihan-keterampilan-kerja.jpg",
  },
  {
    id: 3,
    title: "Pembukaan Layanan Sertifikasi BNSP Tahun 2023",
    category: "Berita",
    date: "23 November 2023",
    image: "/sertifikasi-bnsp-profesional.jpg",
  },
  {
    id: 4,
    title: "Kerja Berkah: Solusi Berkelanjutan untuk Pengangguran",
    category: "Artikel",
    date: "22 November 2023",
    image: "/kerja-berkah-program-sosial.jpg",
  },
]

export default function NewsSection() {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-balance">Berita Terkini</h2>
            <p className="text-gray-600 mt-2">Informasi terbaru dan terpenting dari Disnakertrans Kalteng</p>
          </div>
          <Link href="/blog">
            <Button className="hidden md:flex items-center gap-2 bg-purple-600 text-white hover:bg-purple-700">
              Lihat Semua Berita <ChevronRight size={20} />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsItems.map((item) => (
            <Link key={item.id} href={`/blog/${item.id}`}>
              <article className="group cursor-pointer bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative h-40 md:h-48 overflow-hidden bg-gray-100">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500">{item.date}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div className="mt-8 md:hidden">
          <Link href="/blog">
            <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              Lihat Semua Berita
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
