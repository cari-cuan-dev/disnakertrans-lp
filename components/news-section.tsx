"use client"

import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
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

export default function NewsSection() {
  const [newsItems, setNewsItems] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`/api/blogs?category_id=1`);
        if (response.ok) {
          const data: BlogItem[] = await response.json();
          // Take only the first 4 items
          setNewsItems(data.slice(0, 4));
        } else {
          console.error('Failed to fetch news:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

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
          {loading ? (
            // Loading placeholders
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <div className="relative h-40 md:h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                </div>
              </div>
            ))
          ) : newsItems.length > 0 ? (
            newsItems.map((item) => (
              <Link key={item.id} href={`/blog/${item.id}`}>
                <article className="group cursor-pointer bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="relative h-40 md:h-48 overflow-hidden bg-gray-100">
                    <img
                      src={item.img_cover_path || "/placeholder.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">
                        {item.categories.name}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500">{new Date(item.created_at).toLocaleDateString('id-ID')}</p>
                  </div>
                </article>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600">Tidak ada berita yang ditemukan</p>
            </div>
          )}
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
