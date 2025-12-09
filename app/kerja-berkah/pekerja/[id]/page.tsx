import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"
import { ArrowLeft, MapPin, Award, Briefcase, Mail, Phone, Share2, Download } from "lucide-react"

// Mock data untuk pekerja detail
const allWorkers = [
  {
    id: 1,
    name: "Budi Santoso",
    title: "Web Developer",
    experience: "3-5 Tahun",
    location: "Palangka Raya",
    image: "/magang-jepang-program-internasional.jpg",
    brief: "Web Developer berpengalaman dengan keahlian React dan Node.js",
    email: "budi.santoso@email.com",
    phone: "081234567890",
    description: `Saya adalah seorang Web Developer yang passionate dalam mengembangkan aplikasi web modern. Dengan pengalaman 4 tahun di industri teknologi, saya telah mengerjakan berbagai proyek dari startup hingga perusahaan besar.

Pengalaman Kerja:
- PT. Tech Indonesia (2021-Sekarang): Senior Web Developer
- PT. Digital Solutions (2019-2021): Web Developer
- PT. Creative Tech (2018-2019): Junior Web Developer

Keahlian:
- Frontend: React, Vue.js, HTML5, CSS3, JavaScript (ES6+), Tailwind CSS
- Backend: Node.js, Express, MongoDB, PostgreSQL
- Tools: Git, Docker, VS Code
- Metodologi: Agile, RESTful API

Saya selalu belajar teknologi terbaru dan berkontribusi aktif dalam komunitas developer. Saya mencari peluang untuk bekerja di proyek-proyek yang challenging dan meaningful.`,
    skills: ["React", "Node.js", "JavaScript", "MongoDB", "PostgreSQL", "Docker", "Git", "Tailwind CSS"],
    certifications: ["React Advanced Course", "Node.js Certification", "AWS Certified Associate"],
    languages: ["Indonesian", "English"],
  },
  {
    id: 2,
    name: "Siti Nurhaliza",
    title: "UI/UX Designer",
    experience: "2-3 Tahun",
    location: "Palangka Raya",
    image: "/pelatihan-keterampilan-kerja.jpg",
    brief: "Designer UI/UX kreatif dengan portfolio yang impressive",
    email: "siti.nurhaliza@email.com",
    phone: "081234567891",
    description: `Sebagai UI/UX Designer berpengalaman, saya menciptakan antarmuka yang indah, fungsional, dan user-centered. Saya memiliki passion dalam memahami user behavior dan menciptakan solusi desain yang innovative.

Pengalaman Kerja:
- PT. Design Studio (2022-Sekarang): Senior UI/UX Designer
- PT. Creative Agency (2020-2022): UI/UX Designer
- Freelance (2019-2020): UI/UX Designer

Keahlian:
- Tools: Figma, Adobe XD, Sketch, InVision
- User Research & Testing
- Wireframing & Prototyping
- Design Systems
- Motion Design

Portfolio saya mencakup proyek-proyek di berbagai industri termasuk fintech, e-commerce, dan SaaS. Saya berkomitmen untuk menghadirkan pengalaman pengguna yang exceptional.`,
    skills: [
      "Figma",
      "Adobe XD",
      "User Research",
      "Wireframing",
      "Prototyping",
      "Design Systems",
      "Motion Design",
      "UI Design",
    ],
    certifications: ["Google UX Design Certificate", "Interaction Design Foundation Course", "Advanced Figma"],
    languages: ["Indonesian", "English"],
  },
  {
    id: 3,
    name: "Ahmad Ridho",
    title: "Data Analyst",
    experience: "2 Tahun",
    location: "Sampit",
    image: "/sertifikasi-bnsp-profesional.jpg",
    brief: "Data Analyst detail-oriented dengan keahlian SQL dan Python",
    email: "ahmad.ridho@email.com",
    phone: "081234567892",
    description: `Saya adalah Data Analyst yang passionate dalam menggali insights dari data. Dengan keahlian dalam SQL, Python, dan BI tools, saya membantu bisnis membuat keputusan yang data-driven.

Pengalaman Kerja:
- PT. Analytics Pro (2023-Sekarang): Data Analyst
- PT. Business Intelligence (2022-2023): Junior Data Analyst
- Internship (2021-2022): Data Analyst Intern

Keahlian:
- SQL, Python, Pandas, NumPy
- Tableau, Power BI, Google Analytics
- Excel Advanced
- Statistical Analysis

Saya telah menyelesaikan berbagai proyek analisis yang menghasilkan actionable insights dan significant cost savings. Saya terus belajar teknik analytics dan machine learning yang baru.`,
    skills: [
      "SQL",
      "Python",
      "Tableau",
      "Power BI",
      "Excel",
      "Google Analytics",
      "Statistical Analysis",
      "Data Visualization",
    ],
    certifications: ["Google Data Analytics Certificate", "SQL Advanced", "Python for Data Analysis"],
    languages: ["Indonesian", "English"],
  },
  {
    id: 4,
    name: "Nur Azizah",
    title: "Project Manager",
    experience: "5+ Tahun",
    location: "Palangka Raya",
    image: "/kerja-berkah-program-sosial.jpg",
    brief: "Project Manager berpengalaman dengan sertifikasi PMP",
    email: "nur.azizah@email.com",
    phone: "081234567893",
    description: `Saya adalah Project Manager bersertifikat PMP dengan 6 tahun pengalaman mengelola proyek-proyek strategis. Saya berpengalaman dalam memimpin tim multidisiplin dan delivering projects on time dan within budget.

Pengalaman Kerja:
- PT. Management Consultant (2020-Sekarang): Senior Project Manager
- PT. Construction Company (2017-2020): Project Manager
- PT. IT Services (2015-2017): Junior Project Manager

Keahlian:
- PMP Certified, PRINCE2 Practitioner
- Agile, Scrum, Waterfall
- Stakeholder Management
- Risk Management
- Budget Control

Saya telah sukses mengelola proyek senilai ratusan juta dengan tingkat kepuasan klien yang tinggi. Leadership dan komunikasi yang kuat adalah kunci kesuksesan saya.`,
    skills: [
      "Project Planning",
      "Budget Control",
      "Team Leadership",
      "Agile",
      "Scrum",
      "Risk Management",
      "Stakeholder Management",
      "PRINCE2",
    ],
    certifications: ["PMP Certification", "PRINCE2 Practitioner", "Certified Scrum Master"],
    languages: ["Indonesian", "English"],
  },
  {
    id: 5,
    name: "Reza Pratama",
    title: "Digital Marketing Specialist",
    experience: "2-3 Tahun",
    location: "Palangka Raya",
    image: "/magang-jepang-program-internasional.jpg",
    brief: "Marketing specialist dengan expertise di social media dan Google Ads",
    email: "reza.pratama@email.com",
    phone: "081234567894",
    description: `Saya adalah Digital Marketing Specialist yang passionate dalam menciptakan campaign yang impactful dan ROI-driven. Dengan expertise dalam Google Ads, Facebook Ads, dan social media marketing, saya telah membantu berbagai brand mencapai target mereka.

Pengalaman Kerja:
- PT. Digital Marketing (2022-Sekarang): Digital Marketing Specialist
- PT. E-Commerce (2021-2022): Marketing Executive
- Agency (2020-2021): Junior Digital Marketer

Keahlian:
- Google Ads, Facebook Ads, Instagram Ads
- Social Media Management
- Content Marketing
- Email Marketing
- Analytics & Reporting

Saya telah menjalankan campaign dengan total spend miliaran rupiah dan menghasilkan ROI yang signifikan. Data-driven approach adalah filosofi kerja saya.`,
    skills: [
      "Google Ads",
      "Facebook Ads",
      "Social Media Marketing",
      "Content Marketing",
      "Email Marketing",
      "Analytics",
      "Copywriting",
      "SEO",
    ],
    certifications: ["Google Ads Certification", "Facebook Blueprint Certified", "HubSpot Content Marketing"],
    languages: ["Indonesian", "English"],
  },
  {
    id: 6,
    name: "Dewi Lestari",
    title: "Java Developer",
    experience: "3-5 Tahun",
    location: "Sukamara",
    image: "/pelatihan-keterampilan-kerja.jpg",
    brief: "Java Developer berpengalaman dengan Spring Framework expertise",
    email: "dewi.lestari@email.com",
    phone: "081234567895",
    description: `Saya adalah Java Developer dengan 4 tahun pengalaman mengembangkan aplikasi enterprise yang scalable dan robust. Saya memiliki expertise dalam Spring Framework dan Microservices Architecture.

Pengalaman Kerja:
- PT. Software Solution (2021-Sekarang): Senior Java Developer
- PT. Enterprise Systems (2019-2021): Java Developer
- Startup Tech (2017-2019): Junior Developer

Keahlian:
- Java, Spring Framework, Spring Boot
- Microservices, REST API
- PostgreSQL, MongoDB
- Docker, Kubernetes
- Git, Jenkins CI/CD

Saya telah mengembangkan sistem yang melayani jutaan transaksi per hari. Passion saya adalah clean code dan scalable architecture.`,
    skills: [
      "Java",
      "Spring Framework",
      "Spring Boot",
      "Microservices",
      "REST API",
      "PostgreSQL",
      "Docker",
      "Kubernetes",
    ],
    certifications: [
      "Oracle Java Associate Certification",
      "Spring Professional Certification",
      "Docker & Kubernetes Course",
    ],
    languages: ["Indonesian", "English"],
  },
]

export default async function WorkerDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const worker = allWorkers.find((w) => w.id === Number.parseInt(id))

  if (!worker) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-white">
          <section className="py-12 px-4">
            <div className="max-w-6xl mx-auto text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Pekerja tidak ditemukan</h1>
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
              href="/kerja-berkah/pekerja"
              className="flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity w-fit text-purple-600"
            >
              <ArrowLeft size={20} />
              Kembali ke Database Pekerja
            </Link>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Sidebar */}
              <div className="md:col-span-1">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden sticky top-4">
                  <img
                    src={worker.image || "/placeholder.svg"}
                    alt={worker.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">{worker.name}</h1>
                    <p className="text-purple-600 font-semibold mb-4">{worker.title}</p>

                    {/* Contact */}
                    <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail size={16} className="text-purple-600 flex-shrink-0" />
                        <a
                          href={`mailto:${worker.email}`}
                          className="hover:text-purple-600 transition-colors break-all"
                        >
                          {worker.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone size={16} className="text-purple-600 flex-shrink-0" />
                        <a href={`tel:${worker.phone}`} className="hover:text-purple-600 transition-colors">
                          {worker.phone}
                        </a>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="space-y-3 mb-6">
                      <div className="flex gap-2">
                        <Award className="text-purple-600 flex-shrink-0" size={18} />
                        <div>
                          <p className="text-xs text-gray-600">Pengalaman</p>
                          <p className="font-semibold text-gray-900">{worker.experience}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <MapPin className="text-blue-600 flex-shrink-0" size={18} />
                        <div>
                          <p className="text-xs text-gray-600">Lokasi</p>
                          <p className="font-semibold text-gray-900">{worker.location}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Briefcase className="text-purple-600 flex-shrink-0" size={18} />
                        <div>
                          <p className="text-xs text-gray-600">Bahasa</p>
                          <p className="font-semibold text-gray-900">{worker.languages.join(", ")}</p>
                        </div>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="space-y-2">
                      <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-2 rounded-lg transition-all">
                        Hubungi
                      </button>
                      <button className="w-full bg-purple-100 hover:bg-purple-200 text-purple-600 font-bold py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                        <Download size={16} />
                        CV
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="md:col-span-2">
                {/* Description */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Tentang</h2>
                  <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{worker.description}</p>
                </div>

                {/* Skills */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Keahlian</h2>
                  <div className="flex flex-wrap gap-3">
                    {worker.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Sertifikasi</h2>
                  <ul className="space-y-3">
                    {worker.certifications.map((cert, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Share */}
                <button className="w-full bg-purple-100 hover:bg-purple-200 text-purple-600 font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                  <Share2 size={18} />
                  Bagikan Profil
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
