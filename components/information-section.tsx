"use client"

export default function InformationSection() {
  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Tentang Disnakertrans</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Penjelasan Disnakertrans Kalteng</h3>
            <p className="text-gray-600 mb-4">
              Dinas Ketenagakerjaan dan Perindustrian Kalimantan Tengah (Disnakertrans) adalah lembaga pemerintah yang
              bertanggung jawab dalam pengelolaan kebijakan ketenagakerjaan dan pembangunan industri di Kalimantan
              Tengah.
            </p>
            <p className="text-gray-600 mb-4">
              Kami berkomitmen untuk meningkatkan kualitas tenaga kerja, memperluas kesempatan kerja, dan mendorong
              pertumbuhan industri yang berkelanjutan di wilayah Kalimantan Tengah.
            </p>
            <p className="text-gray-600">
              Dengan berbagai program dan layanan inovatif, kami siap mendukung pengembangan karir dan bisnis
              masyarakat.
            </p>
          </div>

          {/* Right */}
          <div className="bg-white rounded-xl p-8 border border-purple-200/50">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Visi & Misi</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-purple-600 mb-2">Visi</h4>
                <p className="text-gray-600">
                  Menjadi lembaga terdepan dalam pemberdayaan tenaga kerja dan pengembangan industri yang berkelanjutan
                  di Kalimantan Tengah.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-purple-600 mb-2">Misi</h4>
                <ul className="text-gray-600 space-y-2 list-disc list-inside">
                  <li>Meningkatkan kompetensi tenaga kerja</li>
                  <li>Memperluas lapangan kerja</li>
                  <li>Mendukung pertumbuhan UMKM</li>
                  <li>Memberikan layanan terbaik</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
