import { NextRequest } from 'next/server'
import { registerCompany } from '@/lib/actions/kerja-berkah-register-company'

// Fungsi untuk menangani serialisasi BigInt
function replacer(key: string, value: any) {
  if (typeof value === 'bigint') {
    return Number(value);
  }
  return value;
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const result = await registerCompany(data)

    return new Response(JSON.stringify(result, replacer), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message || 'Terjadi kesalahan saat mendaftarkan perusahaan'
      }, replacer),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }
}