"use client"

import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Play, Maximize2, X, Image as ImageIcon, Video as VideoIcon, Calendar } from "lucide-react"
import * as Dialog from "@radix-ui/react-dialog"

interface GalleryItem {
    id: string
    title: string
    description: string | null
    type: "photo" | "video"
    media_path: string
    status: boolean
    sort: number | null
    created_at: string
}

export default function GalleryPage() {
    const [galleries, setGalleries] = useState<GalleryItem[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedMedia, setSelectedMedia] = useState<GalleryItem | null>(null)

    useEffect(() => {
        const fetchGalleries = async () => {
            try {
                setLoading(true)
                const response = await fetch("/api/galleries")
                if (response.ok) {
                    const data = await response.json()
                    setGalleries(data)
                } else {
                    console.error("Failed to fetch galleries:", response.statusText)
                }
            } catch (error) {
                console.error("Error fetching galleries:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchGalleries()
    }, [])

    return (
        <>
            <Navigation />
            <main className="min-h-screen bg-gray-50 pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
                            Galeri
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Dokumentasi visual berbagai kegiatan dan momen berharga yang diselenggarakan oleh Disnakertrans Kalimantan Tengah.
                        </p>
                    </div>

                    {loading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
                                    <div className="aspect-video bg-gray-200"></div>
                                    <div className="p-6">
                                        <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                                        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : galleries.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {galleries.map((item) => (
                                <div
                                    key={item.id}
                                    onClick={() => setSelectedMedia(item)}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer flex flex-col"
                                >
                                    <div className="relative aspect-video overflow-hidden bg-gray-900">
                                        {item.type === "photo" ? (
                                            <img
                                                src={item.media_path || "/placeholder-gallery.jpg"}
                                                alt={item.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="relative w-full h-full">
                                                <video
                                                    src={item.media_path}
                                                    className="w-full h-full object-cover opacity-60"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/50">
                                                        <Play className="text-white fill-white ml-1" size={32} />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {/* Type Badge */}
                                        <div className="absolute top-4 right-4 z-10">
                                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-bold">
                                                {item.type === "photo" ? (
                                                    <>
                                                        <ImageIcon size={14} />
                                                        <span>PHOTO</span>
                                                    </>
                                                ) : (
                                                    <>
                                                        <VideoIcon size={14} />
                                                        <span>VIDEO</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                            <div className="flex items-center gap-2 text-white text-sm font-medium">
                                                <Maximize2 size={18} />
                                                <span>Lihat Selengkapnya</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
                                            <Calendar size={14} />
                                            <span>{new Date(item.created_at).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors line-clamp-1">
                                            {item.title}
                                        </h3>
                                        {item.description && (
                                            <p className="text-gray-600 text-sm line-clamp-2">
                                                {item.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                <ImageIcon className="text-gray-300" size={40} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Belum ada galeri</h3>
                            <p className="text-gray-500">Silakan cek kembali nanti untuk pembaruan terbaru.</p>
                        </div>
                    )}
                </div>

                {/* Lightbox Modal */}
                <Dialog.Root open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
                    <Dialog.Portal>
                        <Dialog.Overlay className="fixed inset-0 bg-black/95 z-[9999] backdrop-blur-sm animate-in fade-in duration-300" />
                        <Dialog.Content className="fixed inset-0 z-[10000] flex items-center justify-center p-4 md:p-10 animate-in zoom-in-95 duration-300 focus:outline-none">
                            <div className="relative w-full max-w-6xl max-h-full flex flex-col bg-transparent group/modal">
                                <Dialog.Close className="absolute -top-12 right-0 md:-right-12 text-white/70 hover:text-white transition-colors p-2 z-[10001]">
                                    <X size={32} />
                                </Dialog.Close>

                                <div className="flex-1 overflow-hidden rounded-2xl bg-black">
                                    {selectedMedia?.type === "photo" ? (
                                        <img
                                            src={selectedMedia.media_path}
                                            alt={selectedMedia.title}
                                            className="w-full h-full object-contain"
                                        />
                                    ) : (
                                        <video
                                            src={selectedMedia?.media_path}
                                            controls
                                            autoPlay
                                            className="w-full h-full"
                                        />
                                    )}
                                </div>

                                {selectedMedia && (
                                    <div className="mt-6 md:mt-8 text-white px-2">
                                        <h2 className="text-2xl md:text-3xl font-bold mb-2">{selectedMedia.title}</h2>
                                        {selectedMedia.description && (
                                            <p className="text-lg text-white/70">{selectedMedia.description}</p>
                                        )}
                                        <div className="mt-4 flex items-center gap-2 text-white/40 text-sm">
                                            <Calendar size={16} />
                                            <span>{new Date(selectedMedia.created_at).toLocaleDateString("id-ID", { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </Dialog.Content>
                    </Dialog.Portal>
                </Dialog.Root>
            </main>
            <Footer />
        </>
    )
}
