"use client"

import { FileText, Download, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState, useEffect } from "react"

export interface DocumentationItem {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  file_path: string;
  size: string | null;
  status: boolean;
  created_at?: string | null;
  updated_at?: string | null;
}

export default function DocumentationSection() {
  const [documents, setDocuments] = useState<DocumentationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocumentations = async () => {
      try {
        const response = await fetch('/api/documentations');
        if (response.ok) {
          const data: DocumentationItem[] = await response.json();
          setDocuments(data);
        } else {
          console.error('Failed to fetch documentation:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching documentation:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocumentations();
  }, []);

  if (loading) {
    return (
      <section className="py-12 md:py-20 bg-gradient-to-r from-purple-50 via-transparent to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Dokumentasi</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (  // Change to 4 items
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-200 animate-pulse"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                  <div className="w-4 h-4 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="bg-purple-600 text-white px-4 py-2 rounded-lg inline-block animate-pulse">
              <span className="h-5 bg-purple-700 rounded w-40"></span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Only show the first 4 documents (the newest ones since they're already sorted by newest first)
  const displayedDocuments = documents.slice(0, 4);

  return (
    <section className="py-12 md:py-20 bg-gradient-to-r from-purple-50 via-transparent to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Dokumentasi</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">  {/* Changed grid to show 4 columns */}
          {displayedDocuments.map((item) => (
            <div
              key={item.id}
              className="group bg-white rounded-xl p-6 border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FileText size={24} className="text-purple-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 line-clamp-2 group-hover:text-purple-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 mt-2">
                    {item.type} • {item.size || '0 KB'}
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
