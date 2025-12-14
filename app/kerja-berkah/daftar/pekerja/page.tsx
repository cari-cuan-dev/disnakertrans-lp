"use client"

import type React from "react"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function DaftarPekerjaPage() {
  const [formData, setFormData] = useState({
    namaLengkap: "",
    email: "",
    telepon: "",
    tanggalLahir: "",
    alamat: "",
    kota: "",
    pendidikan: "sma",
    pengalaman: "fresh",
    keahlian: "",
    cv: null,
    tujuanKarir: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({ ...prev, cv: e.target.files?.[0] || null }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    alert("Terima kasih telah mendaftar! Tim kami akan menghubungi Anda segera.")
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
                    name="namaLengkap"
                    value={formData.namaLengkap}
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
                      name="telepon"
                      value={formData.telepon}
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
                      name="tanggalLahir"
                      value={formData.tanggalLahir}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Kota *</label>
                    <input
                      type="text"
                      name="kota"
                      value={formData.kota}
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
                    name="alamat"
                    value={formData.alamat}
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
            <div className="border-b pb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Informasi Kerja</h2>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Pendidikan Terakhir *</label>
                    <select
                      name="pendidikan"
                      value={formData.pendidikan}
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
                      name="pengalaman"
                      value={formData.pengalaman}
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
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Keahlian/Keterampilan *</label>
                  <textarea
                    name="keahlian"
                    value={formData.keahlian}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Contoh: Web Development, Desain Grafis, Manajemen Proyek, dll"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Tujuan Karir</label>
                  <textarea
                    name="tujuanKarir"
                    value={formData.tujuanKarir}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Jelaskan tujuan karir Anda"
                  />
                </div>
              </div>
            </div>

            {/* CV Upload */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Berkas</h2>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Upload CV (PDF, DOC, DOCX)</label>
                <div className="border-2 border-dashed border-purple-300 rounded-lg p-6 text-center hover:border-purple-500 transition-colors">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    id="cv-upload"
                  />
                  <label htmlFor="cv-upload" className="cursor-pointer">
                    <p className="text-gray-600">
                      {formData.cv ? formData.cv.name : "Klik atau drag file CV Anda di sini"}
                    </p>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            {/* <div className="border-t pt-6">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 rounded-lg transition-all"
              >
                Daftar Sekarang
              </button>
            </div> */}
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}
