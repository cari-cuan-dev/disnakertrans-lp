"use client"

import { useState } from "react"
import { Search, Briefcase } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { isAuthenticated } from "@/lib/auth"

export default function KerjaBerkahSearch() {
  const [searchJobsQuery, setSearchJobsQuery] = useState("")
  const [searchWorkersQuery, setSearchWorkersQuery] = useState("")
  const [activeTab, setActiveTab] = useState("jobs")
  const [location, setLocation] = useState("all")
  const [jobType, setJobType] = useState("all")
  const [experience, setExperience] = useState("all")
  const [workerLocation, setWorkerLocation] = useState("all")

  const checkAuthAndRedirect = async (href: string) => {
    const authenticated = await isAuthenticated();
    if (!authenticated) {
      // Redirect to login
      window.location.href = '/login';
    } else {
      // If authenticated, allow navigation to the search page
      window.location.href = href;
    }
  };

  return (
    <div className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 text-white py-12 px-4 rounded-lg">
      <h3 className="text-3xl font-bold text-center mb-8">Temukan Apa yang Anda Cari</h3>

      <div className="flex gap-4 mb-8 justify-center flex-wrap">
        <button
          onClick={() => setActiveTab("jobs")}
          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
            activeTab === "jobs" ? "bg-white text-blue-700 shadow-lg" : "bg-white/20 hover:bg-white/30 text-white"
          }`}
        >
          <Briefcase className="inline mr-2" size={18} />
          Cari Lowongan Kerja
        </button>
        <button
          onClick={() => setActiveTab("workers")}
          className={`px-6 py-2 rounded-lg font-semibold transition-all ${
            activeTab === "workers" ? "bg-white text-blue-700 shadow-lg" : "bg-white/20 hover:bg-white/30 text-white"
          }`}
        >
          <Search className="inline mr-2" size={18} />
          Cari Pekerja
        </button>
      </div>

      {/* Search Jobs Form */}
      {activeTab === "jobs" && (
        <div className="max-w-2xl mx-auto space-y-4">
          <div>
            <label className="block text-sm font-bold mb-2 text-white">Posisi yang Dicari</label>
            <input
              type="text"
              placeholder="Misal: Web Developer, Designer, Manajer..."
              value={searchJobsQuery}
              onChange={(e) => setSearchJobsQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-lg text-gray-900 bg-white font-medium placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-purple-600"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-2 text-white">Lokasi</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 rounded-lg text-gray-900 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-purple-600"
              >
                <option value="all">Semua Lokasi</option>
                <option value="palangka-raya">Palangka Raya</option>
                <option value="sampit">Sampit</option>
                <option value="sukamara">Sukamara</option>
                <option value="muara-teweh">Muara Teweh</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-white">Tipe Pekerjaan</label>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="w-full px-4 py-3 rounded-lg text-gray-900 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-purple-600"
              >
                <option value="all">Semua Tipe</option>
                <option value="full-time">Full Time</option>
                <option value="part-time">Part Time</option>
                <option value="kontrak">Kontrak</option>
                <option value="magang">Magang</option>
              </select>
            </div>
          </div>
          <button
            onClick={() => checkAuthAndRedirect(`/kerja-berkah/lowongan?q=${encodeURIComponent(searchJobsQuery)}&location=${location}&type=${jobType}`)}
            className="w-full bg-white text-blue-700 font-bold py-3 rounded-lg hover:bg-yellow-100 transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            <Search size={20} />
            Cari Lowongan
          </button>
        </div>
      )}

      {/* Search Workers Form */}
      {activeTab === "workers" && (
        <div className="max-w-2xl mx-auto space-y-4">
          <div>
            <label className="block text-sm font-bold mb-2 text-white">Keahlian/Keterampilan</label>
            <input
              type="text"
              placeholder="Misal: Teknik Mesin, Desain Grafis, Akuntansi..."
              value={searchWorkersQuery}
              onChange={(e) => setSearchWorkersQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-lg text-gray-900 bg-white font-medium placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-purple-600"
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-2 text-white">Pengalaman Kerja</label>
              <select
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className="w-full px-4 py-3 rounded-lg text-gray-900 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-purple-600"
              >
                <option value="all">Semua Level</option>
                <option value="fresh">Fresh Graduate</option>
                <option value="1-2">1-2 Tahun</option>
                <option value="3-5">3-5 Tahun</option>
                <option value="5plus">5+ Tahun</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-2 text-white">Lokasi Asal</label>
              <select
                value={workerLocation}
                onChange={(e) => setWorkerLocation(e.target.value)}
                className="w-full px-4 py-3 rounded-lg text-gray-900 bg-white font-medium focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-purple-600"
              >
                <option value="all">Semua Lokasi</option>
                <option value="palangka-raya">Palangka Raya</option>
                <option value="sampit">Sampit</option>
                <option value="sukamara">Sukamara</option>
                <option value="muara-teweh">Muara Teweh</option>
              </select>
            </div>
          </div>
          <button
            onClick={() => checkAuthAndRedirect(`/kerja-berkah/pekerja?q=${encodeURIComponent(searchWorkersQuery)}&experience=${experience}&location=${workerLocation}`)}
            className="w-full bg-white text-blue-700 font-bold py-3 rounded-lg hover:bg-yellow-100 transition-colors flex items-center justify-center gap-2 shadow-lg"
          >
            <Search size={20} />
            Cari Pekerja
          </button>
        </div>
      )}
    </div>
  )
}
