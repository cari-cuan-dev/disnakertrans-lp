"use client"

import { useEffect, useState } from "react"
import { CheckCircle2 } from "lucide-react"
import { HighlightData } from "@/app/api/highlights/route"

export default function HighlightSection() {
  const [data, setData] = useState<HighlightData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/highlights")
        if (response.ok) {
          const result = await response.json()
          setData(result)
        }
      } catch (error) {
        console.error("Error fetching highlight section:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return null
  if (!data) return null

  return (
    <section id="highlight" className="py-12 md:py-20 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-balance">
              {data.title}
            </h2>
            <p className="text-lg text-gray-600 mb-8 whitespace-pre-line">
              {data.description}
            </p>

            {data.features && data.features.length > 0 && (
              <div className="space-y-4 mb-8">
                {data.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 size={24} className="text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature.item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Image */}
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl p-8 flex items-center justify-center min-h-96">
            <img
              src={data.image_path || "/blessed-workspace-employment-program.jpg"}
              alt={data.title}
              className="w-full h-full object-cover rounded-xl shadow-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                if (!target.src.includes("/blessed-workspace-employment-program.jpg")) {
                  target.src = "/blessed-workspace-employment-program.jpg";
                }
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
