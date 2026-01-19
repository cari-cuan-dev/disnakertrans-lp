"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SliderItem {
  id: string;
  title: string;
  subtitle: string;
  image_path: string;
  status: boolean;
  blog_id?: string; // Tambahkan field blog_id
}

export default function HeroCarousel() {
  const [slides, setSlides] = useState<SliderItem[]>([]);
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch slides from API
    const fetchSlides = async () => {
      try {
        const response = await fetch('/api/sliders');
        if (response.ok) {
          const data: SliderItem[] = await response.json();
          setSlides(data);
        } else {
          console.error('Failed to fetch sliders:', response.statusText);
          // Fallback to static slides if API fails
          setSlides([
            {
              id: "1",
              title: "Memberdayakan Tenaga Kerja Indonesia",
              subtitle: "Program pelatihan dan sertifikasi untuk meningkatkan kompetensi",
              image_path: "/indonesian-workers-training-program.jpg",
              blog_id: "1",
              status: true,
            },
            {
              id: "2",
              title: "Dukungan Kerja Berkah untuk Kalteng",
              subtitle: "Menciptakan lapangan kerja berkelanjutan untuk masyarakat",
              image_path: "/employment-program-sustainable-jobs.jpg",
              blog_id: "2",
              status: true,
            },
            {
              id: "3",
              title: "Transparansi dan Pelayanan Terbaik",
              subtitle: "Komitmen kami untuk melayani dengan sepenuh hati",
              image_path: "/government-service-transparency.jpg",
              blog_id: "3",
              status: true,
            },
          ]);
        }
      } catch (error) {
        console.error('Error fetching slides:', error);
        // Fallback to static slides if API fails
        setSlides([
          {
            id: "1",
            title: "Memberdayakan Tenaga Kerja Indonesia",
            subtitle: "Program pelatihan dan sertifikasi untuk meningkatkan kompetensi",
            image_path: "/indonesian-workers-training-program.jpg",
            blog_id: "1",
            status: true,
          },
          {
            id: "2",
            title: "Dukungan Kerja Berkah untuk Kalteng",
            subtitle: "Menciptakan lapangan kerja berkelanjutan untuk masyarakat",
            image_path: "/employment-program-sustainable-jobs.jpg",
            blog_id: "2",
            status: true,
          },
          {
            id: "3",
            title: "Transparansi dan Pelayanan Terbaik",
            subtitle: "Komitmen kami untuk melayani dengan sepenuh hati",
            image_path: "/government-service-transparency.jpg",
            blog_id: "3",
            status: true,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  useEffect(() => {
    if (!autoPlay || loading || slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [autoPlay, loading, slides.length])

  const prev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
    setAutoPlay(false)
  }

  const next = () => {
    setCurrent((prev) => (prev + 1) % slides.length)
    setAutoPlay(false)
  }

  if (loading) {
    return (
      <div className="relative w-full h-96 md:h-[600px] overflow-hidden bg-gradient-to-r from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-purple-700 font-medium">Memuat konten...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-96 md:h-[600px] overflow-hidden bg-gradient-to-r from-purple-50 to-blue-50">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === current ? "opacity-100 pointer-events-auto z-10" : "opacity-0 pointer-events-none z-0"
            }`}
        >
          <img
            src={slide.image_path || "/placeholder-blog.jpg"}
            alt={slide.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (!target.src.includes("/placeholder-blog.jpg")) {
                target.src = "/placeholder-blog.jpg";
              } else {
                target.onerror = null;
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
              <h2 className="text-3xl md:text-5xl font-bold mb-4 text-pretty">{slide.title}</h2>
              <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-2xl">{slide.subtitle}</p>
              <a
                href={slide.blog_id ? `/blog/${slide.blog_id}` : '#'}
                onClick={(e) => {
                  if (!slide.blog_id) {
                    e.preventDefault();
                  }
                }}
              >
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                  Pelajari Lebih Lanjut
                </Button>
              </a>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
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
              setCurrent(index);
              setAutoPlay(false);
            }}
            className={`w-2 h-2 rounded-full transition-all ${index === current ? "bg-white w-8" : "bg-white/60"
              }`}
          />
        ))}
      </div>
    </div>
  );
}