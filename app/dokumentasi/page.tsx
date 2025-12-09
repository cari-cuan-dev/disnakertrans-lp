"use client"

import { useState } from "react"
import { FileText, Download, PlayCircle, ImageIcon, File } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

const allDocuments = [
  {
    id: 1,
    title: "Panduan Layanan Sertifikasi 2023",
    type: "pdf",
    size: "2.4 MB",
    date: "15 November 2023",
    category: "Panduan",
    thumbnail: "/sertifikasi.jpg",
    content: "Panduan lengkap untuk proses sertifikasi keahlian",
  },
  {
    id: 2,
    title: "Laporan Kinerja Tahunan 2023",
    type: "pdf",
    size: "3.1 MB",
    date: "10 Desember 2023",
    category: "Laporan",
    thumbnail: "/laporan.jpg",
    content: "Laporan kinerja dan pencapaian tahun 2023",
  },
  {
    id: 3,
    title: "Video Tutorial Penempatan Kerja",
    type: "video",
    duration: "12:45",
    date: "5 November 2023",
    category: "Tutorial",
    thumbnail: "/video-tutorial-concept.png",
    content: "Panduan video cara mendaftar penempatan kerja",
  },
  {
    id: 4,
    title: "Infografis Program Kerja Berkah",
    type: "image",
    size: "1.2 MB",
    date: "20 Oktober 2023",
    category: "Infografis",
    thumbnail: "/infografis-kerja.jpg",
    content: "Infografis lengkap program kerja berkah",
  },
  {
    id: 5,
    title: "Tata Cara Pengajuan Sertifikasi",
    type: "pdf",
    size: "1.8 MB",
    date: "12 Oktober 2023",
    category: "Panduan",
    thumbnail: "/tata-cara.jpg",
    content: "Langkah-langkah mengajukan sertifikasi keahlian BNSP",
  },
  {
    id: 6,
    title: "Webinar Pengembangan SDM",
    type: "video",
    duration: "1:23:15",
    date: "1 Oktober 2023",
    category: "Webinar",
    thumbnail: "/webinar-announcement.png",
    content: "Webinar tentang pengembangan sumber daya manusia",
  },
  {
    id: 7,
    title: "Poster Kampanye Keselamatan Kerja",
    type: "image",
    size: "2.5 MB",
    date: "25 September 2023",
    category: "Kampanye",
    thumbnail: "/keselamatan-kerja.jpg",
    content: "Poster kampanye pentingnya keselamatan kerja",
  },
  {
    id: 8,
    title: "Peraturan Teknis Sertifikasi 2023",
    type: "pdf",
    size: "4.2 MB",
    date: "15 September 2023",
    category: "Regulasi",
    thumbnail: "/regulasi.jpg",
    content: "Peraturan teknis dan persyaratan sertifikasi",
  },
]

const categories = ["Semua", "Panduan", "Laporan", "Tutorial", "Infografis", "Webinar", "Kampanye", "Regulasi"]

export default function DokumentasiPage() {
  const [selectedCategory, setSelectedCategory] = useState("Semua")
  const [searchTerm, setSearchTerm] = useState("")

  const filteredDocs = allDocuments.filter((doc) => {
    const matchCategory = selectedCategory === "Semua" || doc.category === selectedCategory
    const matchSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase())
    return matchCategory && matchSearch
  })

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "video":
        return <PlayCircle size={20} className="text-red-600" />
      case "image":
        return <ImageIcon size={20} className="text-blue-600" />
      case "pdf":
        return <FileText size={20} className="text-purple-600" />
      default:
        return <File size={20} className="text-gray-600" />
    }
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Dokumentasi Lengkap</h1>
            <p className="text-gray-600 text-lg">
              Akses semua panduan, laporan, video, dan infografis dari Disnakertrans Kalimantan Tengah
            </p>
          </div>

          {/* Search and Filter */}
          <div className="mb-8 space-y-4">
            <input
              type="text"
              placeholder="Cari dokumentasi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            />

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-purple-600 text-white shadow-lg"
                      : "bg-white border border-gray-300 text-gray-700 hover:border-purple-300"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Documents Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocs.map((doc) => (
              <div
                key={doc.id}
                className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="relative h-48 bg-gray-200 overflow-hidden">
                  <img
                    src={doc.thumbnail || "/placeholder.svg"}
                    alt={doc.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Document Type Badge */}
                  <div className="absolute top-3 right-3 bg-white rounded-lg p-2 shadow-lg">
                    {getDocumentIcon(doc.type)}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                    {doc.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{doc.content}</p>

                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>{doc.date}</span>
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">{doc.category}</span>
                  </div>

                  {/* Document Size or Duration */}
                  <div className="flex items-center gap-2 text-xs text-gray-600 mb-4">
                    {doc.type === "video" ? (
                      <>
                        <PlayCircle size={14} />
                        <span>{doc.duration}</span>
                      </>
                    ) : (
                      <>
                        <FileText size={14} />
                        <span>{doc.size}</span>
                      </>
                    )}
                  </div>

                  {/* Download Button */}
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                    <Download size={16} className="mr-2" />
                    {doc.type === "video" ? "Tonton" : "Unduh"}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredDocs.length === 0 && (
            <div className="text-center py-16">
              <FileText size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Tidak ada dokumentasi ditemukan</h3>
              <p className="text-gray-600">Coba ubah filter atau cari dengan kata kunci yang berbeda</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
