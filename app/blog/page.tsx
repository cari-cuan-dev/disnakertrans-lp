"use client"

import type React from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { ChevronLeft, ArrowUpDown } from "lucide-react"

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
    show_back_button: boolean;
  };
}

export default function BlogPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(() => {
    const initialCategory = searchParams?.get("category") || "Semua";
    return initialCategory;
  })
  const [sortBy, setSortBy] = useState("terbaru") // terbaru or terlama
  const [blogData, setBlogData] = useState<BlogItem[]>([])
  const [loading, setLoading] = useState(true)
  const [categories, setCategories] = useState<string[]>([])
  const [article, setArticle] = useState<BlogItem | null>(null)

  // Sync selectedCategory with URL params
  useEffect(() => {
    const categoryFromUrl = searchParams?.get("category") || "Semua"
    setSelectedCategory(categoryFromUrl)
  }, [searchParams])

  useEffect(() => {
    const fetchCategoriesAndData = async () => {
      try {
        setLoading(true)

        // Fetch categories first
        const categoriesResponse = await fetch('/api/blog-categories');
        if (categoriesResponse.ok) {
          const categoryNames: string[] = await categoriesResponse.json();
          setCategories(["Semua", ...categoryNames]);
        } else {
          console.error('Failed to fetch categories:', categoriesResponse.statusText);
        }

        // Then fetch filtered data
        const category = searchParams?.get("category")
        const service = searchParams?.get("service")

        const params = new URLSearchParams();
        if (category) params.append('category', category);
        if (service) params.append('service', service);
        if (searchTerm) params.append('search', searchTerm);

        const response = await fetch(`/api/blogs?${params.toString()}`)
        if (response.ok) {
          const data: BlogItem[] = await response.json()
          setBlogData(data)
        } else {
          console.error('Failed to fetch blog data:', response.statusText)
        }
      } catch (error) {
        console.error('Error fetching blog data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategoriesAndData()
  }, [searchParams, searchTerm])

  useEffect(() => {
    if (selectedArticle) {
      const article = blogData.find((a) => a.id === selectedArticle)
      setArticle(article || null)
    }
  }, [selectedArticle, blogData])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [selectedArticle])

  const filteredAndSortedArticles = (() => {
    let filtered = [...blogData]

    if (selectedCategory !== "Semua") {
      filtered = filtered.filter((article) => article.categories.name === selectedCategory)
    }

    if (sortBy === "terbaru") {
      filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    } else if (sortBy === "terlama") {
      filtered.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
    }

    return filtered
  })()

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50">
        {!selectedArticle ? (
          <section className="py-12 md:py-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {searchParams?.get("category") || searchParams?.get("service") ? "Hasil Pencarian" : "Semua Berita"}
                </h1>
                <p className="text-gray-600">
                  {searchParams?.get("category") && `Kategori: ${searchParams.get("category")}`}
                  {searchParams?.get("service") && `Layanan: ${searchParams.get("service")}`}
                  {!searchParams?.get("category") &&
                    !searchParams?.get("service") &&
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
                          onClick={() => {
                            setSelectedCategory(category);
                            // Update URL with only the new category
                            const params = new URLSearchParams();
                            if (category !== "Semua") {
                              params.set('category', category);
                            }
                            // Only preserve service parameter, not search term when switching category
                            const service = searchParams?.get("service");
                            if (service) params.set('service', service);

                            router.push(`?${params.toString()}`);
                          }}
                          className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${selectedCategory === category
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

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-white rounded-lg overflow-hidden shadow-md border border-gray-200 animate-pulse">
                      <div className="h-48 bg-gray-200"></div>
                      <div className="p-6">
                        <div className="h-4 bg-gray-200 rounded w-1/4 mb-3"></div>
                        <div className="h-6 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                        <div className="flex justify-between">
                          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredAndSortedArticles.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredAndSortedArticles.map((item) => (
                    <article
                      key={item.id}
                      onClick={() => setSelectedArticle(item.id)}
                      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer border border-gray-200"
                    >
                      <div className="h-48 overflow-hidden bg-gray-200">
                        <img
                          src={item.img_cover_path || "/placeholder-blog.jpg"}
                          alt={item.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null; // prevents looping
                            target.src = "/placeholder-blog.jpg";
                          }}
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                            {item.categories.name}
                          </span>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{item.title}</h2>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                          {item.content.replace(/<[^>]*>/g, '').substring(0, 100) + '...'}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{new Date(item.created_at).toLocaleDateString('id-ID')}</span>
                          <span>Oleh Admin</span>
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
        ) : article ? (
          <section className="py-12 md:py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              {article.categories.show_back_button && (
                <button
                  onClick={() => {
                    setSelectedArticle(null);
                    setSelectedCategory(article.categories.name);
                    const params = new URLSearchParams();
                    params.set('category', article.categories.name);
                    router.push(`?${params.toString()}`);
                  }}
                  className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-8 font-medium"
                >
                  <ChevronLeft size={20} />
                  Kembali ke Daftar {article.categories.name}
                </button>
              )}

              <article className="bg-white rounded-lg overflow-hidden shadow-lg">
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

                <div className="p-8 md:p-12">
                  <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b border-gray-200">
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                      {article.categories.name}
                    </span>
                    <span className="text-sm text-gray-600">{new Date(article.created_at).toLocaleDateString('id-ID')}</span>
                    <span className="text-sm text-gray-600">
                      Oleh <strong>Admin</strong>
                    </span>
                  </div>

                  <h1 className="text-4xl font-bold text-gray-900 mb-6 text-balance">{article.title}</h1>

                  <div
                    className="prose prose-lg max-w-none mb-8 [&_p]:text-gray-700 [&_p]:mb-4 [&_p]:leading-relaxed [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:text-lg [&_h3]:font-medium [&_ul]:list-disc [&_ul]:ps-6 [&_ol]:list-decimal [&_ol]:ps-6 [&_li]:mb-1 [&_strong]:font-bold [&_em]:italic [&_a]:text-purple-600 [&_a]:underline [&_blockquote]:border-l-4 [&_blockquote]:border-purple-500 [&_blockquote]:pl-4 [&_blockquote]:italic"
                    dangerouslySetInnerHTML={{
                      __html: article.content
                    }}
                  />

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

                  <BlogArticleActions article={article} />

                  <BlogComments articleId={article.id} />
                </div>
              </article>
            </div>
          </section>
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-600">Artikel tidak ditemukan</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}

function BlogArticleActions({ article }: { article: BlogItem }) {
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

      {/* <button
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
      {/* <h2 className="text-2xl font-bold text-gray-900 mb-8">Komentar ({comments.length})</h2>

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
      </div> */}
    </div>
  )
}
