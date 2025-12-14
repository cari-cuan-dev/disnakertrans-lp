import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import KerjaBerkahCarousel from "@/components/kerja-berkah-carousel"
import KerjaBerkahStats from "@/components/kerja-berkah-stats"
import KerjaBerkahSearch from "@/components/kerja-berkah-search"
import ProtectedSearchSection from "@/components/protected-search-section"
import ScrollToHash from "@/components/scroll-to-hash"
import { ArrowRight, CheckCircle, Users, Briefcase, Heart, MapPin, Phone, Mail } from "lucide-react"
import Link from "next/link"

export default function KerjaBerkahPage() {
  return (
    <>
      <Navigation />
      <ScrollToHash />
      <main className="min-h-screen bg-white">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 text-white py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl font-bold mb-6 text-balance">Kerja Berkah</h1>
                <p className="text-xl text-purple-100 mb-8">
                  Program pemberdayaan ekonomi dari Pemerintah Provinsi Kalimantan Tengah untuk memberikan kesempatan
                  kerja kepada masyarakat yang membutuhkan.
                </p>
                {/* <Link href="/kerja-berkah/daftar" className="inline-block">
                  <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors flex items-center gap-2">
                    Daftar Sekarang <ArrowRight size={20} />
                  </button>
                </Link> */}
              </div>
              <div className="hidden md:block">
                <img
                  src="/kerja-berkah-community-work-program.jpg"
                  alt="Kerja Berkah"
                  className="w-full rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Carousel Section */}
        <section className="py-8 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <KerjaBerkahCarousel />
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Manfaat Program</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-purple-600">
                <Briefcase className="text-purple-600 mb-4" size={32} />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Kesempatan Kerja</h3>
                <p className="text-gray-600">Akses ke pekerjaan yang layak dan sesuai dengan kemampuan Anda.</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-blue-600">
                <Heart className="text-blue-600 mb-4" size={32} />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Kesejahteraan Keluarga</h3>
                <p className="text-gray-600">Tingkatkan pendapatan keluarga dan kualitas hidup Anda.</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-purple-600">
                <Users className="text-purple-600 mb-4" size={32} />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Pemberdayaan Komunitas</h3>
                <p className="text-gray-600">Bekerja bersama masyarakat untuk membangun lingkungan yang lebih baik.</p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-blue-600">
                <CheckCircle className="text-blue-600 mb-4" size={32} />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Pengalaman Kerja</h3>
                <p className="text-gray-600">Dapatkan pengalaman kerja dan keterampilan yang berharga.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <KerjaBerkahStats />
          </div>
        </section>

        {/* Program Details */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Tentang Program Kerja Berkah</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <img src="/community-service-work.jpg" alt="Program Details" className="w-full rounded-lg shadow-lg" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Solusi Berkelanjutan untuk Pengangguran</h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  Kerja Berkah adalah inisiatif strategis dari Pemerintah Provinsi Kalimantan Tengah yang dirancang
                  untuk memberikan kesempatan kerja kepada masyarakat yang kurang beruntung. Program ini telah membantu
                  ribuan orang menemukan pekerjaan yang bermakna.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-purple-600 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-gray-900">Pelatihan Keterampilan</h4>
                      <p className="text-gray-600 text-sm">
                        Program pelatihan gratis untuk meningkatkan kompetensi kerja
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-gray-900">Penempatan Kerja</h4>
                      <p className="text-gray-600 text-sm">Bantuan penempatan ke berbagai perusahaan dan organisasi</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-purple-600 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-gray-900">Dukungan Berkelanjutan</h4>
                      <p className="text-gray-600 text-sm">Pendampingan dan dukungan selama masa kerja</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                    <div>
                      <h4 className="font-semibold text-gray-900">Jaminan Sosial</h4>
                      <p className="text-gray-600 text-sm">Perlindungan dan jaminan sosial untuk peserta program</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Search Features Section - Only show if user is authenticated */}
        <ProtectedSearchSection />

        {/* How to Apply */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Cara Mengikuti Program</h2>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="relative">
                <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold mb-4 text-lg">
                  1
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Pendaftaran</h3>
                <p className="text-gray-600">Isi formulir pendaftaran dan lengkapi dokumen yang diperlukan.</p>
                {/* Arrow */}
                <div className="hidden md:block absolute -right-4 top-6 text-purple-600 text-2xl">→</div>
              </div>
              <div className="relative">
                <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold mb-4 text-lg">
                  2
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Seleksi</h3>
                <p className="text-gray-600">Proses seleksi untuk menentukan kelayakan peserta program.</p>
                <div className="hidden md:block absolute -right-4 top-6 text-purple-600 text-2xl">→</div>
              </div>
              <div className="relative">
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold mb-4 text-lg">
                  3
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Pelatihan</h3>
                <p className="text-gray-600">Mengikuti program pelatihan keterampilan kerja yang komprehensif.</p>
                <div className="hidden md:block absolute -right-4 top-6 text-blue-600 text-2xl">→</div>
              </div>
              <div>
                <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold mb-4 text-lg">
                  4
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Penempatan</h3>
                <p className="text-gray-600">Ditempatkan di perusahaan mitra sesuai kompetensi Anda.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        {/* <section className="py-16 px-4 bg-purple-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Siap Mengubah Hidup Anda?</h2>
            <p className="text-xl text-gray-600 mb-8">
              Bergabunglah dengan ribuan orang yang telah merasakan manfaat dari Program Kerja Berkah.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/kerja-berkah/daftar"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
              >
                Daftar Program <ArrowRight size={20} />
              </Link>
              <Link
                href="/"
                className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-lg font-semibold transition-all"
              >
                Kembali ke Beranda
              </Link>
            </div>
          </div>
        </section> */}

        {/* Contact Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Hubungi Kami</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Phone className="text-purple-600 mx-auto mb-4" size={32} />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Telepon</h3>
                <p className="text-gray-600">(0536) 3222 1234</p>
              </div>
              <div className="text-center">
                <Mail className="text-blue-600 mx-auto mb-4" size={32} />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
                <p className="text-gray-600">kerja.berkah@disnakertrans.go.id</p>
              </div>
              <div className="text-center">
                <MapPin className="text-purple-600 mx-auto mb-4" size={32} />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Lokasi</h3>
                <p className="text-gray-600">Jl. Ahmad Yani No. 1, Palangka Raya</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
