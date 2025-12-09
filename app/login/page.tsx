"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // Simulate login process
    setTimeout(() => {
      if (email && password) {
        alert("Login berhasil! (Demo - Silakan kembali ke halaman utama)")
        setEmail("")
        setPassword("")
      } else {
        setError("Email dan password tidak boleh kosong")
      }
      setLoading(false)
    }, 1500)
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-transparent flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 mb-8 font-medium"
          >
            <ArrowLeft size={20} />
            Kembali ke Beranda
          </Link>

          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-purple-100">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-12">
              <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold text-2xl">D</span>
              </div>
              <h1 className="text-2xl font-bold text-white mb-2">Portal Disnakertrans</h1>
              <p className="text-purple-100">Masuk untuk mengakses portal layanan</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8">
              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
              )}

              {/* Email Field */}
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Masukkan email Anda"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password Anda"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 accent-purple-600" />
                  <span className="text-sm text-gray-700">Ingat saya</span>
                </label>
                <a href="#" className="text-sm text-purple-600 hover:text-purple-700 font-medium">
                  Lupa password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-400 text-white py-3 rounded-lg font-semibold transition-all duration-300"
              >
                {loading ? "Memproses..." : "Masuk"}
              </button>

              {/* Sign Up Link */}
              <p className="text-center text-gray-600 text-sm mt-6">
                Belum punya akun?{" "}
                <a href="#" className="text-purple-600 hover:text-purple-700 font-semibold">
                  Daftar di sini
                </a>
              </p>
            </form>

            {/* Footer Info */}
            <div className="px-8 py-4 bg-gray-50 border-t border-gray-200">
              <p className="text-xs text-gray-600 text-center">
                Layanan ini dilindungi dan aman. Jangan bagikan password Anda kepada siapapun.
              </p>
            </div>
          </div>

          {/* Demo Info */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-800">
              <strong>Info Demo:</strong> Gunakan email dan password apapun untuk login (demo mode)
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
