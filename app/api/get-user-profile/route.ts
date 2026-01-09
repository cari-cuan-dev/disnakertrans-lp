import { NextRequest } from 'next/server'
import { jwtDecode } from 'jwt-decode'

interface JwtPayload {
  id: number;
  [key: string]: any;
}

export async function GET(request: NextRequest) {
  try {
    // Ambil token dari header
    const authHeader = request.headers.get('authorization')
    const token = authHeader?.split(' ')[1] // Ambil token setelah 'Bearer '

    if (!token) {
      return new Response(
        JSON.stringify({ error: 'Token tidak ditemukan' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Decode token untuk mendapatkan user ID
    const decoded = jwtDecode<JwtPayload>(token)
    const userId = decoded.id

    // Kita tidak bisa mengakses Prisma langsung di sini karena ini adalah file client-side
    // Jadi kita perlu membuat implementasi sebenarnya di server action
    // Untuk saat ini, kita buat endpoint API yang akan dipanggil oleh server action
    
    // Kode ini akan berjalan di client, jadi kita perlu panggil API server
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      },
    })

    if (response.status === 200) {
      const userData = await response.json()
      return new Response(JSON.stringify(userData), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      })
    } else {
      return new Response(
        JSON.stringify({ error: 'Gagal mengambil data pengguna' }),
        { status: response.status, headers: { 'Content-Type': 'application/json' } }
      )
    }
  } catch (error: any) {
    console.error('Error getting user profile:', error)
    return new Response(
      JSON.stringify({ error: error.message || 'Terjadi kesalahan saat mengambil profil pengguna' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}