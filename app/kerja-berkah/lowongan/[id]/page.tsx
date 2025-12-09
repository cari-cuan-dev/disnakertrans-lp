import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"
import { ArrowLeft, MapPin, DollarSign, Clock, Building, Share2, Download } from "lucide-react"

// Mock data untuk lowongan kerja detail
const allJobs = [
  {
    id: 1,
    title: "Web Developer",
    company: "PT. Tech Indonesia",
    location: "Palangka Raya",
    salary: "Rp 5.000.000 - Rp 8.000.000",
    type: "Full Time",
    description: "Kami mencari Web Developer berpengalaman untuk mengembangkan aplikasi web modern.",
    fullDescription: `Kami mencari Web Developer berpengalaman untuk bergabung dengan tim pengembangan kami. Anda akan bertanggung jawab untuk mengembangkan dan memelihara aplikasi web yang scalable dan user-friendly.

Tanggung Jawab:
- Mengembangkan fitur-fitur baru menggunakan React dan Node.js
- Melakukan code review dan debugging
- Berkolaborasi dengan designer dan product manager
- Mengoptimalkan performa aplikasi
- Menulis dokumentasi teknis

Kualifikasi:
- Minimal 3 tahun pengalaman sebagai Web Developer
- Menguasai React, Node.js, dan JavaScript modern
- Familiar dengan REST API dan database
- Gelar S1 Teknik Informatika atau yang setara
- Memiliki portfolio atau GitHub yang menunjukkan pekerjaan Anda`,
    requirements: ["3+ tahun pengalaman", "Menguasai React dan Node.js", "Gelar S1 Teknik Informatika"],
    benefits: [
      "Gaji kompetitif",
      "Asuransi kesehatan",
      "Tunjangan transport",
      "Kesempatan belajar",
      "Lingkungan kerja yang supportif",
    ],
    image: "/magang-jepang-program-internasional.jpg",
    postedDate: "2024-01-15",
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "PT. Design Studio",
    location: "Palangka Raya",
    salary: "Rp 4.000.000 - Rp 6.500.000",
    type: "Full Time",
    description: "Desainer UI/UX untuk merancang antarmuka aplikasi mobile dan web yang menarik.",
    fullDescription: `Bergabunglah dengan tim desain kami untuk menciptakan pengalaman pengguna yang luar biasa.

Tanggung Jawab:
- Merancang UI/UX untuk aplikasi mobile dan web
- Membuat wireframe dan prototype
- Melakukan user research dan testing
- Berkolaborasi dengan developer dan product team
- Mengikuti tren desain terkini

Kualifikasi:
- 2+ tahun pengalaman sebagai UI/UX Designer
- Menguasai Figma dan Adobe XD
- Memiliki portfolio yang kuat
- Pemahaman tentang user-centered design
- Komunikasi yang baik`,
    requirements: ["2+ tahun pengalaman", "Menguasai Figma dan Adobe XD", "Portfolio yang kuat"],
    benefits: ["Gaji kompetitif", "Work-life balance", "Asuransi kesehatan", "Pelatihan desain", "Bonus performa"],
    image: "/pelatihan-keterampilan-kerja.jpg",
    postedDate: "2024-01-10",
  },
  {
    id: 3,
    title: "Data Analyst",
    company: "PT. Analytics Pro",
    location: "Sampit",
    salary: "Rp 4.500.000 - Rp 7.000.000",
    type: "Full Time",
    description: "Analis data untuk menganalisis tren bisnis dan memberikan insights yang actionable.",
    fullDescription: `Kami membutuhkan Data Analyst yang passionate tentang data untuk membantu keputusan bisnis.

Tanggung Jawab:
- Menganalisis data bisnis dan membuat laporan
- Membuat visualisasi data menggunakan tools BI
- Melakukan data cleaning dan transformation
- Memberikan insights dan rekomendasi
- Mengidentifikasi peluang optimasi

Kualifikasi:
- 2+ tahun pengalaman sebagai Data Analyst
- Menguasai SQL dan Python
- Familiar dengan tools BI seperti Tableau atau Power BI
- Pemahaman tentang statistik dasar
- Attention to detail yang tinggi`,
    requirements: ["2+ tahun pengalaman", "SQL dan Python", "Mengerti Business Intelligence"],
    benefits: ["Gaji kompetitif", "Asuransi kesehatan", "Sertifikasi gratis", "Bonus kinerja", "Flexibility work"],
    image: "/sertifikasi-bnsp-profesional.jpg",
    postedDate: "2024-01-12",
  },
  {
    id: 4,
    title: "Project Manager",
    company: "PT. Management Consultant",
    location: "Palangka Raya",
    salary: "Rp 6.000.000 - Rp 9.000.000",
    type: "Full Time",
    description: "Mengelola proyek besar dengan tim multidisiplin untuk memastikan delivery tepat waktu.",
    fullDescription: `Kami mencari Project Manager yang experienced untuk memimpin proyek-proyek strategis kami.

Tanggung Jawab:
- Merencanakan dan mengeksekusi proyek
- Mengelola budget dan timeline
- Memimpin tim multidisiplin
- Mengelola stakeholder komunikasi
- Mengidentifikasi dan mitigasi risiko

Kualifikasi:
- 5+ tahun pengalaman sebagai Project Manager
- Sertifikasi PMP atau PRINCE2
- Kepemimpinan dan komunikasi yang kuat
- Kemampuan problem-solving
- Familiar dengan Agile dan Waterfall methodology`,
    requirements: ["5+ tahun pengalaman", "Sertifikasi PMP atau PRINCE2", "Kepemimpinan kuat"],
    benefits: [
      "Gaji sangat kompetitif",
      "Bonus performa",
      "Asuransi kesehatan premium",
      "Kesempatan karir",
      "Executive benefits",
    ],
    image: "/kerja-berkah-program-sosial.jpg",
    postedDate: "2024-01-08",
  },
  {
    id: 5,
    title: "Marketing Specialist",
    company: "PT. Digital Marketing",
    location: "Palangka Raya",
    salary: "Rp 3.500.000 - Rp 5.500.000",
    type: "Full Time",
    description: "Spesialis pemasaran digital untuk mengelola kampanye di berbagai platform media sosial.",
    fullDescription: `Bergabunglah dengan tim marketing kami untuk mengelola kampanye digital yang impactful.

Tanggung Jawab:
- Merencanakan strategi marketing digital
- Mengelola kampanye di Google Ads dan Facebook Ads
- Membuat konten marketing yang engaging
- Menganalisis metrics dan ROI
- Berkolaborasi dengan creative team

Kualifikasi:
- 2+ tahun pengalaman Marketing Digital
- Familiar dengan Google Ads dan Facebook Ads
- Data-driven mindset
- Kreativitas dan analytical skills
- Komunikasi yang baik`,
    requirements: ["2+ tahun pengalaman", "Familiar dengan Google Ads dan Facebook Ads", "Data-driven mindset"],
    benefits: ["Gaji kompetitif", "Insentif performa", "Asuransi kesehatan", "Pelatihan marketing", "Flexible hours"],
    image: "/magang-jepang-program-internasional.jpg",
    postedDate: "2024-01-14",
  },
  {
    id: 6,
    title: "Java Developer",
    company: "PT. Software Solution",
    location: "Sukamara",
    salary: "Rp 5.500.000 - Rp 8.500.000",
    type: "Full Time",
    description: "Developer Java untuk mengembangkan aplikasi enterprise yang scalable dan reliable.",
    fullDescription: `Kami mencari Java Developer untuk mengembangkan sistem enterprise yang robust.

Tanggung Jawab:
- Mengembangkan aplikasi Java enterprise
- Design dan implementasi microservices
- Melakukan code review dan testing
- Optimasi performa dan scalability
- Dokumentasi teknis

Kualifikasi:
- 3+ tahun pengalaman Java Development
- Menguasai Spring Framework
- Familiar dengan Microservices Architecture
- Database (SQL dan NoSQL)
- Git dan CI/CD pipeline`,
    requirements: ["3+ tahun pengalaman", "Spring Framework", "Microservices Architecture"],
    benefits: ["Gaji kompetitif", "Asuransi kesehatan", "Learning budget", "Bonus performa", "Team building"],
    image: "/pelatihan-keterampilan-kerja.jpg",
    postedDate: "2024-01-13",
  },
]

export default async function JobDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const job = allJobs.find((j) => j.id === Number.parseInt(id))
  console.log(id)
  if (!job) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-white">
          <section className="py-12 px-4">
            <div className="max-w-6xl mx-auto text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Lowongan tidak ditemukan</h1>
              <Link
                href="/kerja-berkah"
                className="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Kembali
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Header */}
        <section className="bg-white py-8 px-4 border-b border-gray-200">
          <div className="max-w-6xl mx-auto">
            <Link
              href="/kerja-berkah/lowongan"
              className="flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity w-fit text-purple-600"
            >
              <ArrowLeft size={20} />
              Kembali ke Daftar Lowongan
            </Link>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Image */}
              <img src={job.image || "/placeholder.svg"} alt={job.title} className="w-full h-80 object-cover" />

              {/* Details */}
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">{job.title}</h1>
                    <p className="text-xl text-purple-600 font-semibold mb-4">{job.company}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-purple-100 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200 transition-colors flex items-center gap-2">
                      <Share2 size={18} />
                      Bagikan
                    </button>
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid md:grid-cols-4 gap-4 mb-8 pb-8 border-b border-gray-200">
                  <div className="flex gap-3">
                    <MapPin className="text-purple-600 flex-shrink-0" size={20} />
                    <div>
                      <p className="text-sm text-gray-600">Lokasi</p>
                      <p className="font-semibold text-gray-900">{job.location}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <DollarSign className="text-blue-600 flex-shrink-0" size={20} />
                    <div>
                      <p className="text-sm text-gray-600">Gaji</p>
                      <p className="font-semibold text-gray-900">{job.salary}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Clock className="text-purple-600 flex-shrink-0" size={20} />
                    <div>
                      <p className="text-sm text-gray-600">Tipe</p>
                      <p className="font-semibold text-gray-900">{job.type}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Building className="text-blue-600 flex-shrink-0" size={20} />
                    <div>
                      <p className="text-sm text-gray-600">Diposting</p>
                      <p className="font-semibold text-gray-900">{job.postedDate}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Deskripsi Pekerjaan</h2>
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{job.fullDescription}</p>
                </div>

                {/* Benefits */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Benefit</h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {job.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-purple-50 p-4 rounded-lg">
                        <div className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0"></div>
                        <p className="text-gray-700">{benefit}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="flex gap-4">
                  <button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 rounded-lg transition-all">
                    Lamar Sekarang
                  </button>
                  <button className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2">
                    <Download size={18} />
                    Unduh
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
