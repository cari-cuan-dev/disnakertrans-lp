"use client"

import type React from "react"

import { useState } from "react"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export default function DaftarPerusahaanPage() {
  const [formData, setFormData] = useState({
    namaPerusahaan: "",
    nomorInduk: "",
    email: "",
    telepon: "",
    alamat: "",
    kota: "",
    provinsi: "",
    bidangIndustri: "",
    jumlahKaryawan: "",
    website: "",
    deskripsi: "",
    kontak: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    alert("Terima kasih telah mendaftar! Tim kami akan segera melakukan verifikasi perusahaan Anda.")
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
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-6"
            >
              <ChevronLeft size={20} />
              Kembali
            </Link>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Daftar sebagai Perusahaan</h1>
            <p className="text-gray-600">Lengkapi form di bawah untuk mulai mencari talenta terbaik</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 space-y-6">
            {/* Company Information */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Informasi Perusahaan</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Nama Perusahaan *</label>
                  <input
                    type="text"
                    name="namaPerusahaan"
                    value={formData.namaPerusahaan}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="PT Contoh Perusahaan"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Nomor Induk Perusahaan *</label>
                    <input
                      type="text"
                      name="nomorInduk"
                      value={formData.nomorInduk}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="1234567890000001"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Email Perusahaan *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="info@perusahaan.com"
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Telepon *</label>
                    <input
                      type="tel"
                      name="telepon"
                      value={formData.telepon}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="(0536) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Website</label>
                    <input
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="https://www.perusahaan.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Alamat Kantor *</label>
                  <textarea
                    name="alamat"
                    value={formData.alamat}
                    onChange={handleChange}
                    required
                    rows={2}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Jalan Ahmad Yani No. 123"
                  />
                </div>
              </div>
            </div>

            {/* Location Information */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Lokasi</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Kota *</label>
                  <input
                    type="text"
                    name="kota"
                    value={formData.kota}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Palangka Raya"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Provinsi *</label>
                  <input
                    type="text"
                    name="provinsi"
                    value={formData.provinsi}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Kalimantan Tengah"
                  />
                </div>
              </div>
            </div>

            {/* Business Information */}
            <div className="border-b pb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Informasi Bisnis</h2>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Bidang Industri *</label>
                    <select
                      name="bidangIndustri"
                      value={formData.bidangIndustri}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Pilih Bidang</option>
                      <option value="manufaktur">Manufaktur</option>
                      <option value="teknologi">Teknologi</option>
                      <option value="retail">Retail</option>
                      <option value="kesehatan">Kesehatan</option>
                      <option value="pendidikan">Pendidikan</option>
                      <option value="keuangan">Keuangan</option>
                      <option value="lainnya">Lainnya</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">Jumlah Karyawan *</label>
                    <select
                      name="jumlahKaryawan"
                      value={formData.jumlahKaryawan}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Pilih Range</option>
                      <option value="1-50">1-50 Karyawan</option>
                      <option value="51-200">51-200 Karyawan</option>
                      <option value="201-500">201-500 Karyawan</option>
                      <option value="500plus">500+ Karyawan</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">Deskripsi Perusahaan</label>
                  <textarea
                    name="deskripsi"
                    value={formData.deskripsi}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Jelaskan visi, misi, dan keunggulan perusahaan Anda"
                  />
                </div>
              </div>
            </div>

            {/* Contact Person */}
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Kontak Orang/Departemen HR</h2>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Nama & Posisi *</label>
                <textarea
                  name="kontak"
                  value={formData.kontak}
                  onChange={handleChange}
                  required
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nama: Budi Santoso, Posisi: HR Manager, Telepon: 08123456789"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="border-t pt-6">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 rounded-lg transition-all"
              >
                Daftar Perusahaan
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  )
}
