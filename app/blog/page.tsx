"use client"

import type React from "react"
import { useSearchParams } from "next/navigation"
import { useState, useMemo, useEffect } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { ChevronLeft, ArrowUpDown } from "lucide-react"

const blogArticles = [
  {
    id: 1,
    title: "Kepala Disnakertrans Lepas 40 Peserta Magang ke Jepang",
    category: "Berita",
    service: "Magang",
    date: "25 November 2023",
    author: "Nur Sirait",
    image: "/magang-jepang-program-internasional.jpg",
    excerpt:
      "Kepala Disnakertrans Kalimantan Tengah melepas 40 peserta magang yang akan mengikuti program magang di Jepang tahun ini.",
    content: `Dalam acara pelepasan yang meriah, Kepala Disnakertrans Kalimantan Tengah memberikan motivasi kepada para peserta magang untuk membawa nama baik Kalimantan Tengah dan Indonesia di negeri Jepang.

Program magang ke Jepang ini merupakan kerjasama dengan Pemerintah Jepang dalam rangka meningkatkan kualitas Sumber Daya Manusia Indonesia. Para peserta akan mempelajari teknologi dan keahlian kerja yang kemudian dapat diterapkan di Kalimantan Tengah.

Peserta magang yang terpilih merupakan hasil seleksi ketat yang mempertimbangkan kompetensi, karakter, dan motivasi kerja yang kuat. Mereka akan ditempatkan di berbagai industri manufaktur di Jepang selama kurang lebih 3 bulan.`,
    tags: ["Magang", "Jepang", "Internasional", "Kerja"],
  },
  {
    id: 2,
    title: "Program Pelatihan Gratis untuk Meningkatkan Skill Kerja",
    category: "Pengumuman",
    service: "Pelatihan",
    date: "24 November 2023",
    author: "Budi Santoso",
    image: "/pelatihan-keterampilan-kerja.jpg",
    excerpt:
      "Disnakertrans membuka program pelatihan gratis untuk meningkatkan kompetensi dan keterampilan kerja bagi masyarakat Kalimantan Tengah.",
    content: `Dalam upaya meningkatkan kompetensi tenaga kerja, Disnakertrans Kalimantan Tengah kembali membuka program pelatihan gratis yang terbuka untuk semua masyarakat.

Program pelatihan ini mencakup berbagai bidang keahlian seperti:
- Mesin Industri dan Otomasi
- Teknik Elektronika
- Welding (Las)
- Administrasi Perkantoran
- Pariwisata dan Perhotelan

Setiap peserta akan mendapatkan sertifikat resmi setelah menyelesaikan program. Pendaftaran dibuka dengan kuota terbatas untuk memastikan kualitas pembelajaran yang optimal.`,
    tags: ["Pelatihan", "Skill", "Gratis", "Keterampilan"],
  },
  {
    id: 3,
    title: "Pembukaan Layanan Sertifikasi BNSP Tahun 2023",
    category: "Berita",
    service: "Sertifikasi",
    date: "23 November 2023",
    author: "Siti Nurhaliza",
    image: "/sertifikasi-bnsp-profesional.jpg",
    excerpt:
      "Layanan sertifikasi BNSP kini tersedia di lokasi terpilih di Kalimantan Tengah untuk memudahkan masyarakat.",
    content: `Badan Nasional Sertifikasi Profesi (BNSP) telah membuka layanan sertifikasi di beberapa kota besar di Kalimantan Tengah. Langkah ini diambil untuk memudahkan masyarakat lokal mendapatkan sertifikasi profesional.

Sertifikasi BNSP diakui secara nasional dan internasional, sehingga akan meningkatkan kompetensi dan daya saing para pencari kerja di pasar global.

Lokasi sertifikasi tersedia di:
- Palangka Raya
- Sampit
- Kuala Kurun

Untuk informasi lebih lanjut dan pendaftaran, silakan menghubungi Disnakertrans atau kunjungi kantor sertifikasi terdekat.`,
    tags: ["BNSP", "Sertifikasi", "Profesional"],
  },
  {
    id: 4,
    title: "Kerja Berkah: Solusi Berkelanjutan untuk Pengangguran",
    category: "Artikel",
    service: "Kerja Berkah",
    date: "22 November 2023",
    author: "Rinto Harahap",
    image: "/kerja-berkah-program-sosial.jpg",
    excerpt: "Program Kerja Berkah telah membantu ribuan masyarakat mendapatkan pekerjaan yang layak.",
    content: `Kerja Berkah adalah program Pemerintah Provinsi Kalimantan Tengah yang bertujuan memberikan kesempatan kerja kepada masyarakat yang kurang beruntung.

Program ini telah terbukti efektif dalam mengurangi tingkat pengangguran dan meningkatkan kualitas hidup masyarakat. Ribuan masyarakat telah merasakan manfaat dari program ini.

Manfaat Program Kerja Berkah:
- Memberikan kesempatan kerja
- Meningkatkan pendapatan keluarga
- Memberdayakan masyarakat lokal
- Menjaga kelestarian lingkungan

Jika Anda tertarik mengikuti program ini, segera daftarkan diri Anda di kantor Disnakertrans terdekat.`,
    tags: ["Kerja Berkah", "Program", "Pemberdayaan"],
  },
  {
    id: 5,
    title: "PPID Disnakertrans Buka Layanan Informasi Publik",
    category: "Berita",
    service: "PPID",
    date: "21 November 2023",
    author: "Ahmad Syaiful",
    image: "/ppid-information-service.jpg",
    excerpt:
      "Pejabat Pengelola Informasi dan Dokumentasi (PPID) Disnakertrans melayani permintaan informasi publik dari masyarakat.",
    content: `PPID Disnakertrans Kalimantan Tengah resmi membuka layanan informasi publik untuk memenuhi hak masyarakat mendapatkan akses informasi.

Layanan ini mencakup berbagai dokumen dan informasi yang berkaitan dengan kegiatan dan kebijakan Disnakertrans. Masyarakat dapat mengajukan permohonan informasi sesuai dengan prosedur yang berlaku.

Informasi yang dapat diakses:
- Laporan tahunan Disnakertrans
- Kebijakan dan peraturan
- Data statistik ketenagakerjaan
- Program dan kegiatan

Untuk informasi lebih lanjut, silakan mengunjungi website PPID atau menghubungi kontak yang tersedia.`,
    tags: ["PPID", "Informasi Publik", "Transparansi"],
  },
  {
    id: 6,
    title: "Penempatan Tenaga Kerja Lokal Meningkat 50%",
    category: "Pengumuman",
    service: "Penempatan",
    date: "20 November 2023",
    author: "Dewi Lestari",
    image: "/worker-placement-statistics.jpg",
    excerpt:
      "Disnakertrans melaporkan peningkatan signifikan dalam penempatan tenaga kerja lokal ke industri lokal dan nasional.",
    content: `Pencapaian luar biasa telah diraih Disnakertrans Kalimantan Tengah dengan peningkatan penempatan tenaga kerja mencapai 50% dibandingkan periode sebelumnya.

Peningkatan ini menunjukkan efektivitas program-program yang telah dilaksanakan dalam meningkatkan kualitas dan kompetensi tenaga kerja lokal.

Statistik penempatan:
- Tenaga kerja bersertifikat: 1.200 orang
- Penempatan ke industri: 800 orang
- Penempatan ke luar negeri: 400 orang

Kesuksesan ini adalah hasil kerja keras dan dedikasi seluruh tim Disnakertrans dalam melayani masyarakat.`,
    tags: ["Penempatan", "Kerja", "Statistik"],
  },
]

export default function BlogPage() {
  const searchParams = useSearchParams()
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Semua")
  const [sortBy, setSortBy] = useState("terbaru") // terbaru or terlama

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [selectedArticle])

  const filteredAndSortedArticles = useMemo(() => {
    const category = searchParams.get("category")
    const service = searchParams.get("service")

    let filtered = blogArticles

    if (category) {
      filtered = filtered.filter((article) => article.category === category || article.service === category)
    }

    if (service) {
      filtered = filtered.filter(
        (article) =>
          article.service.toLowerCase().includes(service.toLowerCase()) ||
          article.tags.some((tag) => tag.toLowerCase().includes(service.toLowerCase())),
      )
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (selectedCategory !== "Semua") {
      filtered = filtered.filter((article) => article.category === selectedCategory)
    }

    if (sortBy === "terbaru") {
      // Keep default order (newest first)
    } else if (sortBy === "terlama") {
      filtered = [...filtered].reverse()
    }

    return filtered
  }, [searchParams, searchTerm, selectedCategory, sortBy])

  const article = blogArticles.find((a) => a.id === selectedArticle)

  const categories = ["Semua", ...new Set(blogArticles.map((a) => a.category))]

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        {!selectedArticle ? (
          <section className="py-12 md:py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {searchParams.get("category") || searchParams.get("service") ? "Hasil Pencarian" : "Semua Berita"}
                </h1>
                <p className="text-gray-600">
                  {searchParams.get("category") && `Kategori: ${searchParams.get("category")}`}
                  {searchParams.get("service") && `Layanan: ${searchParams.get("service")}`}
                  {!searchParams.get("category") &&
                    !searchParams.get("service") &&
                    "Informasi lengkap dari Disnakertrans Kalimantan Tengah"}
                </p>
              </div>

              <div className="mb-8 space-y-4">
                <input
                  type="text"
                  placeholder="Cari berita..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />

                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
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

                  <div className="flex items-center gap-2">
                    <ArrowUpDown size={18} className="text-gray-600" />
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white text-gray-700 text-sm"
                    >
                      <option value="terbaru">Terbaru</option>
                      <option value="terlama">Terlama</option>
                    </select>
                  </div>
                </div>
              </div>

              {filteredAndSortedArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredAndSortedArticles.map((item) => (
                    <article
                      key={item.id}
                      onClick={() => setSelectedArticle(item.id)}
                      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer border border-gray-200"
                    >
                      <div className="h-48 overflow-hidden bg-gray-200">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                            {item.category}
                          </span>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{item.title}</h2>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.excerpt}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{item.date}</span>
                          <span>Oleh {item.author}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 text-lg">Tidak ada berita yang ditemukan untuk kategori ini.</p>
                </div>
              )}
            </div>
          </section>
        ) : null}

        {selectedArticle && article ? (
          <section className="py-12 md:py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <button
                onClick={() => setSelectedArticle(null)}
                className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-8 font-medium"
              >
                <ChevronLeft size={20} />
                Kembali ke Daftar Berita
              </button>

              <article className="bg-white rounded-lg overflow-hidden shadow-lg">
                <div className="w-full h-96 overflow-hidden bg-gray-200">
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-8 md:p-12">
                  <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                      {article.category}
                    </span>
                    <span className="text-sm text-gray-600">{article.date}</span>
                    <span className="text-sm text-gray-600">
                      Oleh <strong>{article.author}</strong>
                    </span>
                  </div>

                  <h1 className="text-4xl font-bold text-gray-900 mb-6 text-balance">{article.title}</h1>

                  <div className="prose prose-lg max-w-none mb-8">
                    {article.content.split("\n\n").map((paragraph, idx) => (
                      <p key={idx} className="text-gray-700 mb-4 leading-relaxed whitespace-pre-wrap">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  <div className="mb-8 pb-8 border-b border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Tags:</h3>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-200 hover:bg-blue-100 cursor-pointer transition-colors"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <BlogArticleActions article={article} />

                  <BlogComments articleId={article.id} />
                </div>
              </article>
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </>
  )
}

function BlogArticleActions({ article }: { article: (typeof blogArticles)[0] }) {
  return (
    <div className="flex flex-wrap gap-4 mb-12 pb-8 border-b border-gray-200">
      <button
        onClick={() => {
          const text = `Baca: ${article.title}`
          const url = typeof window !== "undefined" ? window.location.href : ""
          if (navigator.share) {
            navigator.share({ title: article.title, text, url })
          } else {
            alert("Bagikan: " + text + "\n" + url)
          }
        }}
        className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors font-medium text-sm"
      >
        Bagikan Artikel
      </button>

      <button
        onClick={() => {
          alert("Download PDF sedang dalam proses. Fitur akan tersedia segera.")
        }}
        className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium text-sm"
      >
        Download PDF
      </button>

      <button
        onClick={() => window.print()}
        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
      >
        Cetak
      </button>
    </div>
  )
}

function BlogComments({ articleId }: { articleId: number }) {
  const [comments, setComments] = useState<Array<{ name: string; email: string; text: string; date: string }>>([
    {
      name: "Adi Pratama",
      email: "adi@example.com",
      text: "Informasi yang sangat bermanfaat, terima kasih telah membagikan berita ini.",
      date: "25 November 2023",
    },
    {
      name: "Siti Rahmah",
      email: "siti@example.com",
      text: "Program magang ini sangat membantu generasi muda Indonesia. Semoga terus dilanjutkan!",
      date: "24 November 2023",
    },
  ])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [commentText, setCommentText] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (name && email && commentText) {
      const newComment = {
        name,
        email,
        text: commentText,
        date: new Date().toLocaleDateString("id-ID"),
      }
      setComments([newComment, ...comments])
      setName("")
      setEmail("")
      setCommentText("")
    }
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-8">Komentar ({comments.length})</h2>

      <form onSubmit={handleSubmit} className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tambahkan Komentar</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nama Anda"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
            <input
              type="email"
              placeholder="Email Anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              required
            />
          </div>
          <textarea
            placeholder="Tulis komentar Anda di sini..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium"
          >
            Kirim Komentar
          </button>
        </div>
      </form>

      <div className="space-y-6">
        {comments.map((comment, idx) => (
          <div key={idx} className="p-6 bg-white border border-gray-200 rounded-lg">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h4 className="font-semibold text-gray-900">{comment.name}</h4>
                <p className="text-sm text-gray-500">{comment.date}</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
