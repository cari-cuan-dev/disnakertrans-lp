import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"
import { ArrowRight, Users, Building2 } from "lucide-react"

export default function DaftarPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 text-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Bergabunglah dengan Kerja Berkah</h1>
            <p className="text-xl text-purple-100">
              Pilih kategori pendaftaran Anda untuk memulai perjalanan karir atau mencari talenta terbaik
            </p>
          </div>
        </section>

        {/* Registration Options */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Pekerja Registration */}
              <Link href="/kerja-berkah/daftar/pekerja">
                <div className="bg-white border-2 border-purple-200 rounded-xl p-12 hover:shadow-2xl hover:border-purple-400 transition-all cursor-pointer group">
                  <div className="bg-gradient-to-br from-purple-100 to-purple-50 w-20 h-20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Users className="text-purple-600" size={40} />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Daftar sebagai Pekerja</h2>
                  <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                    Cari lowongan kerja yang sesuai dengan keterampilan dan minat Anda. Bergabunglah dengan ribuan
                    pekerja yang telah menemukan pekerjaan impian mereka melalui platform kami.
                  </p>
                  <div className="space-y-3 mb-8">
                    <div className="flex items-start gap-3">
                      <div className="text-purple-600 font-bold mt-1">✓</div>
                      <span className="text-gray-700">Akses ke ribuan lowongan kerja</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="text-purple-600 font-bold mt-1">✓</div>
                      <span className="text-gray-700">Buat profil lengkap dengan CV</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="text-purple-600 font-bold mt-1">✓</div>
                      <span className="text-gray-700">Dapatkan rekomendasi pekerjaan</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="text-purple-600 font-bold mt-1">✓</div>
                      <span className="text-gray-700">Hubungi perusahaan secara langsung</span>
                    </div>
                  </div>
                  {/* <div className="flex items-center gap-2 text-purple-600 font-semibold group-hover:gap-3 transition-all">
                    Daftar Sekarang <ArrowRight size={20} />
                  </div> */}
                </div>
              </Link>

              {/* Perusahaan Registration */}
              <Link href="/kerja-berkah/daftar/perusahaan">
                <div className="bg-white border-2 border-blue-200 rounded-xl p-12 hover:shadow-2xl hover:border-blue-400 transition-all cursor-pointer group">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-50 w-20 h-20 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Building2 className="text-blue-600" size={40} />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Daftar sebagai Perusahaan</h2>
                  <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                    Temukan talenta terbaik untuk tim Anda. Posting lowongan kerja dan kelola proses rekrutmen dengan
                    mudah melalui dashboard kami yang intuitif.
                  </p>
                  <div className="space-y-3 mb-8">
                    <div className="flex items-start gap-3">
                      <div className="text-blue-600 font-bold mt-1">✓</div>
                      <span className="text-gray-700">Post lowongan kerja unlimited</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="text-blue-600 font-bold mt-1">✓</div>
                      <span className="text-gray-700">Akses ke database pekerja</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="text-blue-600 font-bold mt-1">✓</div>
                      <span className="text-gray-700">Kelola aplikasi dan kandidat</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="text-blue-600 font-bold mt-1">✓</div>
                      <span className="text-gray-700">Analitik dan laporan rekrutmen</span>
                    </div>
                  </div>
                  {/* <div className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                    Daftar Sekarang <ArrowRight size={20} />
                  </div> */}
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-12 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sudah memiliki akun?</h2>
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-purple-600 font-semibold hover:text-purple-700"
            >
              Masuk ke Akun Anda
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
