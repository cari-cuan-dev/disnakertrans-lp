"use client"

import type React from "react"
import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          is_remember: rememberMe
        })
      })

      if (response.status === 200) {
        // Login successful
        const data = await response.json()
        console.log('Login successful:', data)

        // Store the access token
        if (data.access_token) {
          localStorage.setItem('access_token', data.access_token)
        }

        alert("Berhasil masuk!")
        // Redirect to landing page or dashboard
        window.location.href = "/" // or wherever the landing page is
        setEmail("")
        setPassword("")
      } else if (response.status === 401) {
        // Unauthorized - wrong email/password
        setError("Email atau password salah. Silakan coba lagi.")
      } else if (response.status === 429) {
        // Too many requests
        // Check if Retry-After header is accessible (not blocked by CORS)
        let retryAfter = response.headers.get('retry-after') || response.headers.get('Retry-After');
        if (retryAfter) {
          const retryAfterSeconds = parseInt(retryAfter, 10);
          const retryAfterMinutes = Math.ceil(retryAfterSeconds / 60);
          setError(`Terlalu banyak percobaan login. Silakan coba lagi dalam ${retryAfterMinutes} menit.`);
        } else {
          // If header is not accessible, try to get it from response body instead
          try {
            const errorData = await response.json();
            if (errorData['retry-after']) {
              const retryAfterSeconds = errorData['retry-after'];
              const retryAfterMinutes = Math.ceil(retryAfterSeconds / 60);
              setError(`Terlalu banyak percobaan login. Silakan coba lagi dalam ${retryAfterMinutes} menit.`);
            } else if (errorData['Retry-After']) {
              const retryAfterSeconds = errorData['Retry-After'];
              const retryAfterMinutes = Math.ceil(retryAfterSeconds / 60);
              setError(`Terlalu banyak percobaan login. Silakan coba lagi dalam ${retryAfterMinutes} menit.`);
            } else {
              setError("Terlalu banyak percobaan login. Silakan coba lagi nanti.")
            }
          } catch {
            // If we can't parse the body as JSON, show generic message
            setError("Terlalu banyak percobaan login. Silakan coba lagi nanti.")
          }
        }
      } else {
        // Handle other error responses
        const errorData = await response.json()
        setError(errorData.message || "Login gagal. Silakan coba lagi.")
      }
    } catch (err) {
      console.error('Login error:', err)
      setError("Terjadi kesalahan koneksi. Silakan coba lagi.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-transparent flex items-center justify-center p-4">
      <Card className="w-full max-w-sm shadow-lg border border-purple-100">
        <CardHeader className="text-center pb-4">
          <CardTitle className="text-2xl font-bold text-purple-700">Masuk</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="masukan@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="remember-me"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(!!checked)}
              />
              <label htmlFor="remember-me" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Ingat saya
              </label>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
              disabled={loading}
            >
              {loading ? "Memproses..." : "Masuk"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
