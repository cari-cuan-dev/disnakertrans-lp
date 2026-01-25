"use client"

import { useParams, useRouter } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { ChevronLeft } from "lucide-react"
import type React from "react"
import { useState, useEffect } from "react"

export interface BlogItem {
  id: string;
  title: string;
  img_cover_path: string;
  content: string;
  tags: string[];
  status: boolean;
  created_at: string;
  updated_at: string;
  category_id: string;
  sort: number | null;
  categories: {
    id: string;
    name: string;
  };
}

export default function BlogDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [article, setArticle] = useState<BlogItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/blogs/${params.id}`)
        if (response.ok) {
          const data: BlogItem = await response.json()
          setArticle(data)
        } else {
          setError(true)
        }
      } catch (err) {
        console.error('Error fetching blog detail:', err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogDetail()
  }, [params.id])

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Memuat artikel...</p>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  if (error || !article) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Berita Tidak Ditemukan</h1>
            <p className="text-gray-600 mb-8">Berita yang Anda cari tidak tersedia atau sudah dihapus.</p>
            <button
              onClick={() => router.push("/blog")}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Kembali ke Berita
            </button>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        <section className="py-12 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <button
              onClick={() => router.push("/blog")}
              className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-8 font-medium"
            >
              <ChevronLeft size={20} />
              Kembali ke Daftar Berita
            </button>

            {/* Article Container */}
            <article className="bg-white rounded-lg overflow-hidden shadow-lg">
              {/* Featured Image */}
              <div className="w-full h-96 overflow-hidden bg-gray-200">
                <img
                  src={article.img_cover_path || "/placeholder-blog.jpg"}
                  alt={article.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; // prevents looping
                    target.src = "/placeholder-blog.jpg";
                  }}
                />
              </div>

              {/* Article Content */}
              <div className="p-8 md:p-12">
                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                    {article.categories.name}
                  </span>
                  <span className="text-sm text-gray-600">{new Date(article.created_at).toLocaleDateString('id-ID')}</span>
                  <span className="text-sm text-gray-600">
                    Oleh <strong>Admin</strong>
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-4xl font-bold text-gray-900 mb-6 text-balance">{article.title}</h1>

                {/* Content */}
                <div
                  className="rich-text max-w-none mb-8"
                  dangerouslySetInnerHTML={{
                    __html: article.content
                  }}
                />

                {/* Tags */}
                <div className="mb-8 pb-8 border-b border-gray-200">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Tags:</h3>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(article.tags) && article.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full border border-blue-200 hover:bg-blue-100 cursor-pointer transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <BlogArticleActions article={article} />

                {/* Comments Section */}
                <BlogComments articleId={article.id} />
              </div>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

function BlogArticleActions({ article }: { article: BlogItem }) {
  return (
    <div className="flex flex-wrap gap-4 mb-12 pb-8 border-b border-gray-200">
      {/* Share Button */}
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

      {/* Download PDF Button */}
      {/* <button
        onClick={() => {
          alert("Download PDF sedang dalam proses. Fitur akan tersedia segera.")
        }}
        className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium text-sm"
      >
        Download PDF
      </button> */}

      {/* Print Button */}
      {/* <button
        onClick={() => window.print()}
        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium text-sm"
      >
        Cetak
      </button> */}
    </div>
  )
}

function BlogComments({ articleId }: { articleId: string }) {
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
      {/* <h2 className="text-2xl font-bold text-gray-900 mb-8">Komentar ({comments.length})</h2> */}

      {/* Comment Form */}
      {/* <form onSubmit={handleSubmit} className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-200">
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
      </form> */}

      {/* Comments List */}
      {/* <div className="space-y-6">
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
      </div> */}
    </div>
  )
}