"use client"

import { useSearchParams } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"
import { MapPin, Briefcase, Award, ArrowLeft } from "lucide-react"

// Mock data untuk pekerja
const allWorkers = [
  {
    id: 1,
    name: "Budi Santoso",
    skills: "Web Development",
    experience: "3-5 Tahun",
    location: "Palangka Raya",
    image: "/magang-jepang-program-internasional.jpg",
    brief: "Web Developer berpengalaman dengan keahlian React dan Node.js",
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    skills: "UI/UX Design",
    experience: "2-3 Tahun",
    location: "Palangka Raya",
    image: "/pelatihan-keterampilan-kerja.jpg",
    brief: "Designer UI/UX kreatif dengan portfolio yang impressive",
  },
  {
    id: 3,
    name: "Ahmad Ridho",
    skills: "Data Analysis",
    experience: "2 Tahun",
    location: "Sampit",
    image: "/sertifikasi-bnsp-profesional.jpg",
    brief: "Data Analyst detail-oriented dengan keahlian SQL dan Python",
  },
  {
    id: 4,
    name: "Nur Azizah",
    skills: "Project Management",
    experience: "5+ Tahun",
    location: "Palangka Raya",
    image: "/kerja-berkah-program-sosial.jpg",
    brief: "Project Manager berpengalaman dengan sertifikasi PMP",
  },
  {
    id: 5,
    name: "Reza Pratama",
    skills: "Digital Marketing",
    experience: "2-3 Tahun",
    location: "Palangka Raya",
    image: "/magang-jepang-program-internasional.jpg",
    brief: "Marketing specialist dengan expertise di social media dan Google Ads",
  },
  {
    id: 6,
    name: "Dewi Lestari",
    skills: "Java Development",
    experience: "3-5 Tahun",
    location: "Sukamara",
    image: "/pelatihan-keterampilan-kerja.jpg",
    brief: "Java Developer berpengalaman dengan Spring Framework expertise",
  },
]

export default function PekerjaPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const experience = searchParams.get("experience") || "all"
  const location = searchParams.get("location") || "all"

  const filteredWorkers = allWorkers.filter((worker) => {
    const matchesQuery =
      worker.skills.toLowerCase().includes(query.toLowerCase()) ||
      worker.name.toLowerCase().includes(query.toLowerCase())
    const matchesExperience = experience === "all" || worker.experience.includes(experience)
    const matchesLocation = location === "all" || worker.location.toLowerCase().includes(location.toLowerCase())
    return matchesQuery && matchesExperience && matchesLocation
  })

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Header */}
        <section className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 text-white py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <Link
              href="/kerja-berkah"
              className="flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity w-fit"
            >
              <ArrowLeft size={20} />
              Kembali
            </Link>
            <h1 className="text-4xl font-bold mb-4">Database Pekerja</h1>
            <p className="text-lg text-purple-100">
              Ditemukan {filteredWorkers.length} pekerja {query && `untuk "${query}"`}
            </p>
          </div>
        </section>

        {/* Results */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            {filteredWorkers.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWorkers.map((worker) => (
                  <Link
                    key={worker.id}
                    href={`/kerja-berkah/pekerja/${worker.id}`}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border-t-4 border-purple-600 group"
                  >
                    <div className="relative overflow-hidden h-48">
                      <img
                        src={worker.image || "/placeholder.svg"}
                        alt={worker.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                        {worker.name}
                      </h3>
                      <p className="text-purple-600 font-semibold mb-3">{worker.skills}</p>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{worker.brief}</p>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Award size={14} className="text-purple-600" />
                          {worker.experience}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={14} className="text-blue-600" />
                          {worker.location}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg">
                <Briefcase size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Tidak ada pekerja ditemukan</h3>
                <p className="text-gray-600 mb-6">Coba ubah filter pencarian Anda</p>
                <Link
                  href="/kerja-berkah"
                  className="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  Kembali ke Pencarian
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
