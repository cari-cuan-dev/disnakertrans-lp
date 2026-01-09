"use client"

import type React from "react"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function DaftarPekerjaPage() {
  const [formData, setFormData] = useState({
    name: "",
    skills: "",
    skill: "",
    email: "",
    phone: "",
    birth_date: "",
    experience: "fresh",
    city: "",
    address: "",
    education: "sma",
    languages: "",
    description: "",
    certifications: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Parsing skills, languages, dan certifications ke format JSON
      let parsedSkills = []
      let parsedLanguages = []
      let parsedCertifications = []

      // Parsing skills (dipisahkan koma)
      if (formData.skills.trim()) {
        parsedSkills = formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill)
      }

      // Parsing languages (dipisahkan koma)
      if (formData.languages.trim()) {
        parsedLanguages = formData.languages.split(',').map(lang => lang.trim()).filter(lang => lang)
      }

      // Parsing certifications (dipisahkan koma)
      if (formData.certifications.trim()) {
        parsedCertifications = formData.certifications.split(',').map(cert => cert.trim()).filter(cert => cert)
      }

      // Kirim data ke API endpoint
      const response = await fetch('/api/register-worker', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          skills: JSON.stringify(parsedSkills),
          languages: JSON.stringify(parsedLanguages),
          certifications: JSON.stringify(parsedCertifications),
        }),
      })

      const result = await response.json()

      if (response.ok) {
        alert(`Pendaftaran berhasil! Silakan gunakan email dan password sementara berikut untuk login:\n\nEmail: ${formData.email}\nPassword: ${result.temporaryPassword}`)
      } else {
        alert(`Error: ${result.message}`)
      }
    } catch (error: any) {
      console.error("Submission error:", error)
      alert(`Terjadi kesalahan: ${error.message || 'Tidak dapat mengirim formulir'}`)
    }
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/kerja-berkah/daftar"
              className="flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold mb-6"
            >
              <ChevronLeft size={20} />
              Kembali
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Daftar sebagai Pekerja</h1>
            <p className="text-gray-600">Lengkapi form di bawah untuk memulai karir Anda bersama kami</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 space-y-6">
            {/* Personal Information */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Informasi Pribadi</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Nama Lengkap *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="John Doe"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Telepon *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="08123456789"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Tanggal Lahir *</label>
                    <input
                      type="date"
                      name="birth_date"
                      value={formData.birth_date}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Kota *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Palangka Raya"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Alamat *</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Jalan Ahmad Yani No. 123"
                  />
                </div>
              </div>
            </div>

            {/* Work Information */}
            <div className="pb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Informasi Kerja</h2>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Pendidikan Terakhir *</label>
                    <select
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="sma">SMA/SMK</option>
                      <option value="diploma">Diploma (D3)</option>
                      <option value="sarjana">Sarjana (S1)</option>
                      <option value="master">Master (S2)</option>
                      <option value="doktor">Doktor (S3)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Pengalaman Kerja *</label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="fresh">Fresh Graduate</option>
                      <option value="1-2">1-2 Tahun</option>
                      <option value="3-5">3-5 Tahun</option>
                      <option value="5plus">5+ Tahun</option>
                    </select>
                  </div>
                </div>

                {/* Skills Section */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Keahlian/Keterampilan *</label>
                  <textarea
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    required
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Contoh: Web Development, Desain Grafis, Manajemen Proyek, dll"
                  />
                  <p className="text-xs text-gray-500 mt-1">Pisahkan keahlian dengan koma</p>
                </div>

                {/* Additional Skill Field */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Keahlian Tambahan</label>
                  <input
                    type="text"
                    name="skill"
                    value={formData.skill}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Keahlian spesifik tambahan"
                  />
                </div>

                {/* Languages */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Bahasa yang Dikuasai</label>
                  <input
                    type="text"
                    name="languages"
                    value={formData.languages}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Contoh: Indonesia (Native), Inggris (Fluent), dll"
                  />
                </div>

                {/* Certifications */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Sertifikasi</label>
                  <textarea
                    name="certifications"
                    value={formData.certifications}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Contoh: Sertifikasi Project Management, Sertifikasi IT, dll"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Deskripsi Diri</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Jelaskan tentang diri Anda, pengalaman, dan tujuan karir Anda"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="border-t pt-6">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 rounded-lg transition-all"
              >
                Daftar Sekarang
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}
