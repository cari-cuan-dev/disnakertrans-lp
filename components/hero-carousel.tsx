"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const slides = [
  {
    id: 1,
    title: "Memberdayakan Tenaga Kerja Indonesia",
    subtitle: "Program pelatihan dan sertifikasi untuk meningkatkan kompetensi",
    image: "/indonesian-workers-training-program.jpg",
  },
  {
    id: 2,
    title: "Dukungan Kerja Berkah untuk Kalteng",
    subtitle: "Menciptakan lapangan kerja berkelanjutan untuk masyarakat",
    image: "/employment-program-sustainable-jobs.jpg",
  },
  {
    id: 3,
    title: "Transparansi dan Pelayanan Terbaik",
    subtitle: "Komitmen kami untuk melayani dengan sepenuh hati",
    image: "/government-service-transparency.jpg",
  },
]

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)

  useEffect(() => {
    if (!autoPlay) return
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [autoPlay])

  const prev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
    setAutoPlay(false)
  }

  const next = () => {
    setCurrent((prev) => (prev + 1) % slides.length)
    setAutoPlay(false)
  }

  return (
    <div className="relative w-full h-96 md:h-[600px] overflow-hidden bg-gradient-to-r from-purple-50 to-blue-50">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-pretty">{slide.title}</h2>
              <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-2xl">{slide.subtitle}</p>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                Pelajari Lebih Lanjut
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Buttons */}
      <button
        onClick={prev}
        onMouseEnter={() => setAutoPlay(false)}
        onMouseLeave={() => setAutoPlay(true)}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full transition-all"
      >
        <ChevronLeft size={24} className="text-purple-600" />
      </button>
      <button
        onClick={next}
        onMouseEnter={() => setAutoPlay(false)}
        onMouseLeave={() => setAutoPlay(true)}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-2 rounded-full transition-all"
      >
        <ChevronRight size={24} className="text-purple-600" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrent(index)
              setAutoPlay(false)
            }}
            className={`w-2 h-2 rounded-full transition-all ${index === current ? "bg-white w-8" : "bg-white/60"}`}
          />
        ))}
      </div>
    </div>
  )
}
