"use client"

import { useSearchParams } from "next/navigation"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"
import { Briefcase, MapPin, DollarSign, Clock, ArrowLeft, Eye } from "lucide-react"

// Mock data untuk lowongan kerja
const allJobs = [
  {
    id: 1,
    title: "Web Developer",
    company: "PT. Tech Indonesia",
    location: "Palangka Raya",
    salary: "Rp 5.000.000 - Rp 8.000.000",
    type: "Full Time",
    description: "Kami mencari Web Developer berpengalaman untuk mengembangkan aplikasi web modern.",
    requirements: ["3+ tahun pengalaman", "Menguasai React dan Node.js", "Gelar S1 Teknik Informatika"],
    image: "/magang-jepang-program-internasional.jpg",
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "PT. Design Studio",
    location: "Palangka Raya",
    salary: "Rp 4.000.000 - Rp 6.500.000",
    type: "Full Time",
    description: "Desainer UI/UX untuk merancang antarmuka aplikasi mobile dan web yang menarik.",
    requirements: ["2+ tahun pengalaman", "Menguasai Figma dan Adobe XD", "Portfolio yang kuat"],
    image: "/pelatihan-keterampilan-kerja.jpg",
  },
  {
    id: 3,
    title: "Data Analyst",
    company: "PT. Analytics Pro",
    location: "Sampit",
    salary: "Rp 4.500.000 - Rp 7.000.000",
    type: "Full Time",
    description: "Analis data untuk menganalisis tren bisnis dan memberikan insights yang actionable.",
    requirements: ["2+ tahun pengalaman", "SQL dan Python", "Mengerti Business Intelligence"],
    image: "/sertifikasi-bnsp-profesional.jpg",
  },
  {
    id: 4,
    title: "Project Manager",
    company: "PT. Management Consultant",
    location: "Palangka Raya",
    salary: "Rp 6.000.000 - Rp 9.000.000",
    type: "Full Time",
    description: "Mengelola proyek besar dengan tim multidisiplin untuk memastikan delivery tepat waktu.",
    requirements: ["5+ tahun pengalaman", "Sertifikasi PMP atau PRINCE2", "Kepemimpinan kuat"],
    image: "/kerja-berkah-program-sosial.jpg",
  },
  {
    id: 5,
    title: "Marketing Specialist",
    company: "PT. Digital Marketing",
    location: "Palangka Raya",
    salary: "Rp 3.500.000 - Rp 5.500.000",
    type: "Full Time",
    description: "Spesialis pemasaran digital untuk mengelola kampanye di berbagai platform media sosial.",
    requirements: ["2+ tahun pengalaman", "Familiar dengan Google Ads dan Facebook Ads", "Data-driven mindset"],
    image: "/magang-jepang-program-internasional.jpg",
  },
  {
    id: 6,
    title: "Java Developer",
    company: "PT. Software Solution",
    location: "Sukamara",
    salary: "Rp 5.500.000 - Rp 8.500.000",
    type: "Full Time",
    description: "Developer Java untuk mengembangkan aplikasi enterprise yang scalable dan reliable.",
    requirements: ["3+ tahun pengalaman", "Spring Framework", "Microservices Architecture"],
    image: "/pelatihan-keterampilan-kerja.jpg",
  },
]

export default function LowonganPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const location = searchParams.get("location") || "all"
  const type = searchParams.get("type") || "all"

  const filteredJobs = allJobs.filter((job) => {
    const matchesQuery =
      job.title.toLowerCase().includes(query.toLowerCase()) || job.company.toLowerCase().includes(query.toLowerCase())
    const matchesLocation = location === "all" || job.location.toLowerCase().includes(location.toLowerCase())
    const matchesType = type === "all" || job.type.toLowerCase() === type.toLowerCase()
    return matchesQuery && matchesLocation && matchesType
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
            <h1 className="text-4xl font-bold mb-4">Lowongan Kerja</h1>
            <p className="text-lg text-purple-100">
              Ditemukan {filteredJobs.length} lowongan kerja {query && `untuk "${query}"`}
            </p>
          </div>
        </section>

        {/* Results */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            {filteredJobs.length > 0 ? (
              <div className="grid gap-6">
                {filteredJobs.map((job) => (
                  <Link
                    key={job.id}
                    href={`/kerja-berkah/lowongan/${job.id}`}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-purple-600 p-6 flex gap-6 items-start"
                  >
                    <img
                      src={job.image || "/placeholder.svg"}
                      alt={job.title}
                      className="w-32 h-32 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 hover:text-purple-600 transition-colors">
                        {job.title}
                      </h3>
                      <p className="text-gray-700 font-semibold mb-3">{job.company}</p>
                      <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-purple-600" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign size={16} className="text-blue-600" />
                          {job.salary}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-purple-600" />
                          {job.type}
                        </div>
                      </div>
                    </div>
                    <Eye className="text-gray-400 flex-shrink-0" size={20} />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg">
                <Briefcase size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Tidak ada lowongan ditemukan</h3>
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
