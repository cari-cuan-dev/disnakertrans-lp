"use client"

import { useState, useEffect, useRef } from "react"
import { X, Search } from "lucide-react"
import Link from "next/link"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

const blogArticles = [
  {
    id: 1,
    title: "Kepala Disnakertrans Lepas 40 Peserta Magang ke Jepang",
    excerpt: "Program magang ke luar negeri membuka peluang belajar kerja internasional",
    date: "25 November 2023",
  },
  {
    id: 2,
    title: "Program Pelatihan Gratis untuk Meningkatkan Skill Kerja",
    excerpt: "Disnakertrans menyediakan program pelatihan berkala untuk meningkatkan kompetensi",
    date: "24 November 2023",
  },
  {
    id: 3,
    title: "Pembukaan Layanan Sertifikasi BNSP Tahun 2023",
    excerpt: "Sertifikasi BNSP kini tersedia di lokasi terpilih di seluruh Kalimantan Tengah",
    date: "23 November 2023",
  },
  {
    id: 4,
    title: "Kerja Berkah: Solusi Berkelanjutan untuk Pengangguran",
    excerpt: "Program kerja berkah memberikan kesempatan kerja bagi masyarakat yang membutuhkan",
    date: "22 November 2023",
  },
]

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState(blogArticles)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener("keydown", handleEscape)
    }

    return () => window.removeEventListener("keydown", handleEscape)
  }, [isOpen, onClose])

  useEffect(() => {
    if (query.trim() === "") {
      setResults(blogArticles)
    } else {
      const filtered = blogArticles.filter(
        (article) =>
          article.title.toLowerCase().includes(query.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(query.toLowerCase()),
      )
      setResults(filtered)
    }
  }, [query])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-20 px-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-xl" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center border-b border-gray-200 px-4 py-3">
          <Search size={20} className="text-purple-600 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Cari berita atau artikel..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 outline-none text-gray-900 placeholder-gray-400"
          />
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-md transition-colors ml-2">
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {results.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {results.map((article) => (
                <Link
                  key={article.id}
                  href={`/blog/${article.id}`}
                  onClick={onClose}
                  className="px-4 py-3 hover:bg-purple-50 transition-colors cursor-pointer block"
                >
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{article.title}</h3>
                  <p className="text-xs text-gray-600 mb-1 line-clamp-1">{article.excerpt}</p>
                  <p className="text-xs text-gray-500">{article.date}</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="px-4 py-8 text-center">
              <p className="text-gray-500">Tidak ada hasil pencarian untuk "{query}"</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-4 py-3 bg-gray-50 text-xs text-gray-500 flex justify-between">
          <div>
            Tekan <kbd className="bg-white border border-gray-300 rounded px-2 py-1">ESC</kbd> untuk menutup
          </div>
          <div className="hidden sm:block">
            Lihat semua di{" "}
            <Link href="/blog" className="text-purple-600 hover:underline">
              halaman blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
