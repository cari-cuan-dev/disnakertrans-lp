"use client"

import { useState, useEffect } from "react"
import { FileText, Download, PlayCircle, ImageIcon, File, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export interface DocumentationItem {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  file_path: string;
  size: string | null;
  status: boolean;
  created_at: string;
  updated_at: string;
  category_id: string | null;
  sort: number | null;
  categories?: {
    id: string;
    name: string;
  } | null;
}

const DocumentationPage = () => {
  const [documents, setDocuments] = useState<DocumentationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredDocs, setFilteredDocs] = useState<DocumentationItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Semua")
  const [searchTerm, setSearchTerm] = useState("")
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch('/api/all-documentations')
        if (response.ok) {
          const data: DocumentationItem[] = await response.json()
          setDocuments(data)
          setFilteredDocs(data)

          // Extract unique categories based on category name from relations
          const categoryMap = new Map<string, string>();

          // Populate the map with category IDs and their names
          data.forEach(doc => {
            if (doc.category_id && doc.categories?.name) {
              // Use category ID as key to prevent duplicates
              categoryMap.set(doc.category_id, doc.categories.name);
            }
          });

          // Convert the map to an array of category names
          const uniqueCategoryNames = Array.from(categoryMap.values());

          // Check if there are documents with null category_id
          const hasNullCategories = data.some(doc => !doc.category_id) // Jika category_id null

          // Build categories array: ['Semua', 'Umum' (if needed), ...other categories]
          let cats = ['Semua'];
          if (hasNullCategories) {
            cats.push('Umum');
          }
          cats = cats.concat(uniqueCategoryNames);

          setCategories(cats)
        } else {
          console.error('Failed to fetch documents:', response.statusText)
        }
      } catch (error) {
        console.error('Error fetching documents:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchDocuments()
  }, [])

  useEffect(() => {
    let result = documents

    // Apply category filter
    if (selectedCategory !== "Semua") {
      if (selectedCategory === 'Umum') {
        // Filter for documents with null category_id
        result = result.filter(doc => !doc.category_id)
      } else {
        // Filter for specific category based on name
        // Find documents whose category name matches the selected category name
        result = result.filter(doc => doc.categories?.name === selectedCategory)
      }
    }

    // Apply search term
    if (searchTerm) {
      result = result.filter(doc =>
        doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredDocs(result)
  }, [selectedCategory, searchTerm, documents])

  const getDocumentIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "video":
      case "mp4":
      case "mov":
      case "avi":
        return <PlayCircle size={20} className="text-red-600" />
      case "image":
      case "jpg":
      case "jpeg":
      case "png":
      case "gif":
        return <ImageIcon size={20} className="text-blue-600" />
      case "pdf":
      case "doc":
      case "docx":
        return <FileText size={20} className="text-purple-600" />
      default:
        return <File size={20} className="text-gray-600" />
    }
  }

  // Determine file extension from file_path
  const getFileExtension = (filePath: string) => {
    const parts = filePath.split('.');
    return parts[parts.length - 1]?.toLowerCase() || '';
  }

  // Get human-readable size
  const getReadableSize = (size: string | null) => {
    if (size) return size;

    // If no size in response, return a placeholder
    return 'Ukuran tidak diketahui';
  }

  if (loading) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Dokumentasi Lengkap</h1>
              <p className="text-gray-600 text-lg">
                Akses semua panduan, laporan, video, dan infografis dari Disnakertrans Kalimantan Tengah
              </p>
            </div>

            <div className="mb-8 space-y-4">
              <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-200 animate-pulse"></div>

              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="px-4 py-2 bg-gray-200 rounded-lg animate-pulse w-24 h-8"></div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl overflow-hidden border border-gray-200 animate-pulse"
                >
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>

                    <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </div>

                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
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
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Cari dokumentasi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${selectedCategory === category
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
            {filteredDocs.length > 0 ? (
              filteredDocs.map((doc) => {
                // Determine type from file extension if not directly specified
                const fileType = doc.type?.toLowerCase() || getFileExtension(doc.file_path);
                const readableSize = getReadableSize(doc.size);

                // Check if the file_path is a valid URL (presigned URL)
                const isValidUrl = doc.file_path && doc.file_path.startsWith('http');
                return (
                  <div
                    key={doc.id}
                    className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-purple-300 hover:shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    {/* Thumbnail */}
                    <div className="relative h-48 bg-gray-200 overflow-hidden">
                      <img
                        src={isValidUrl ? doc.file_path : "/placeholder.svg"}
                        alt={doc.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null; // prevents looping
                          target.src = "/placeholder.svg"; // fallback to placeholder
                        }}
                      />
                      {/* Document Type Badge */}
                      <div className="absolute top-3 right-3 bg-white rounded-lg p-2 shadow-lg">
                        {getDocumentIcon(fileType)}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                        {doc.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{doc.subtitle}</p>

                      {/* Meta Information */}
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                        <span>{new Date(doc.created_at).toLocaleDateString('id-ID')}</span>
                        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded">
                          {doc.categories?.name || 'Umum'}
                        </span>
                      </div>

                      {/* Document Size or Duration */}
                      <div className="flex items-center gap-2 text-xs text-gray-600 mb-4">
                        <FileText size={14} />
                        <span>{readableSize}</span>
                      </div>

                      {/* Download Button */}
                      <a
                        href={isValidUrl ? doc.file_path : undefined}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={isValidUrl ? undefined : (e) => e.preventDefault()}
                      >
                        <Button
                          className={`w-full ${isValidUrl ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-400 cursor-not-allowed'} text-white`}
                          disabled={!isValidUrl}
                        >
                          <Download size={16} className="mr-2" />
                          {fileType.includes('video') || fileType.includes('mp4') ? "Tonton" : "Unduh"}
                        </Button>
                      </a>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-16">
                <FileText size={48} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Tidak ada dokumentasi ditemukan</h3>
                <p className="text-gray-600">Coba ubah filter atau cari dengan kata kunci yang berbeda</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default DocumentationPage