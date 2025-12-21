import Image from "next/image";

export default function GreetingCard() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Kata Sambutan</h2>
          <p className="mt-2 text-lg text-gray-600">Dari Pimpinan Daerah</p>
        </div>

        {/* Baris pertama: dua foto pejabat */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {/* Foto Gubernur */}
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-purple-100">
              <Image
                src="/pejabat/gubernur.webp"
                alt="Gubernur Kalimantan Tengah"
                fill
                className="object-cover"
                sizes="(max-width: 200px) 100vw, 200px"
              />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mt-3">Nama Gubernur</h3>
            <p className="text-purple-600 text-sm">Gubernur Kalimantan Tengah</p>
          </div>

          {/* Foto Wakil Gubernur */}
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-purple-100">
              <Image
                src="/pejabat/wakil-gubernur.webp"
                alt="Wakil Gubernur Kalimantan Tengah"
                fill
                className="object-cover"
                sizes="(max-width: 200px) 100vw, 200px"
              />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mt-3">Nama Wakil Gubernur</h3>
            <p className="text-purple-600 text-sm">Wakil Gubernur Kalimantan Tengah</p>
          </div>
        </div>

        {/* Baris kedua: satu foto dan satu kata sambutan */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 p-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-shrink-0">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-purple-100">
                <Image
                  src="/pejabat/kepala-dinas.webp"
                  alt="Gubernur Kalimantan Tengah"
                  fill
                  className="object-cover"
                  sizes="(max-width: 200px) 100vw, 200px"
                />
              </div>
            </div>

            <div className="flex-1 text-gray-700 text-left prose prose-lg max-w-none">
              <p>
                Assalamu'alaikum Wr.Wb
              </p>
              <p className="mt-2">
                Pertanian mempunyai peranan penting dalam kehidupan manusia karena berfungsi sebagai penyedia pangan, pakan untuk ternak, dan bioenergi. Peran pertanian sangat strategis dalam mendukung perekonomian daerah, terutama mewujudkan ketahanan pangan, peningkatan daya saing, penyerapan tenaga kerja dan penanggulangan kemiskinan. Selain itu, mendorong pertumbuhan agroindustri di hilir dan memacu ekspor komoditas pertanian untuk meningkatkan pendapatan asli daerah. Di sisi lain, penyediaan kebutuhan pangan masyarakat merupakan tugas utama yang tidak ringan, karena diperkirakan penduduk di Provinsi Kalimantan Tengah akan semakin berkembang pesat.
              </p>
              <p className="mt-2">
                Pengembangan Website Dinas Tanaman Pangan, Hortikultura dan Peternakan Provinsi Kalimantan Tengah merupakan salah satu strategi dalam melaksanakan pengembangan e-government yang transparan. E-Government intinya adalah proses pemanfaatan teknologi informasi sebagai alat untuk membantu menjalankan sistem pemerintahan secara lebih efektif dan efisien. Pembangunan situs web merupakan implementasi dari Instruksi Presiden Nomor.3 Tahun 2003, yang isinya menggalakkan pemanfaatan teknologi informasi.
              </p>
              <p className="mt-2">
                Tujuan pembangunan website ini secara umum adalah memberikan informasi yang seluas-luasnya kepada masyarakat terkait sektor pertanian dan peternakan. Informasi yang diberikan antara lain profil lengkap Dinas beserta tugas dan fungsinya, capaian kinerja, data-data pertanian/peternakan serta peluang investasi.
              </p>
              <p className="mt-2">
                Kami menyadari dalam pembangunan dan pengembangan website ini masih banyak kekurangan, oleh karenanya saran dan pendapat sangat kami perlukan untuk penyempurnaan website ini ke depannya.
              </p>
              <p className="mt-2 text-right italic">
                Palangka Raya, 06 Juli 2025
              </p>
              <p className="mt-6 text-right font-semibold">
                KEPALA DINAS,
              </p>
              <p className="mt-12 text-right font-semibold">
                H. RENDY LESMANA, S.P.,M.M.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}