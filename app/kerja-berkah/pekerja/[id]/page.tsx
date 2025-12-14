"use client"

import { useState, useEffect, use } from "react";
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"
import { ArrowLeft, MapPin, Award, Briefcase, Mail, Phone, Share2, Download, Printer } from "lucide-react"

interface WorkerItem {
  id: string;
  name: string;
  skills: unknown; // JSON type
  skill: string; // Main skill
  email: string;
  phone: string;
  birth_date: string;
  experience: string;
  city: string;
  address: string;
  education: string;
  languages: unknown; // JSON type
  description?: string | null;
  certifications?: unknown | null; // JSON type
  created_at?: string | null;
  user_id?: string | null;
}

export default function WorkerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [worker, setWorker] = useState<WorkerItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorker = async () => {
      try {
        setLoading(true);

        const response = await fetch(`/api/workers/${id}`);
        if (response.ok) {
          const workerData: WorkerItem = await response.json();
          setWorker(workerData);
        } else if (response.status === 404) {
          setWorker(null);
        } else {
          console.error('Failed to fetch worker:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching worker:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchWorker();
    }
  }, [id]);

  if (loading) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-white">
          <section className="py-12 px-4">
            <div className="max-w-6xl mx-auto text-center">
              <div className="animate-pulse">
                <div className="space-y-6">
                  <div className="bg-gray-200 rounded-lg w-3/4 h-8 mx-auto"></div>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                      <div className="bg-gray-200 rounded-lg w-full h-64 mb-4"></div>
                      <div className="p-6 space-y-4">
                        <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-4 bg-gray-200 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                        <div className="h-10 bg-gray-200 rounded"></div>
                        <div className="h-10 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-4/6 mb-4"></div>
                      <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
                      <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

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

  // Format skills from JSON type
  const formatSkills = (skills: unknown): string[] => {
    if (Array.isArray(skills)) {
      return Array.isArray(skills[0]) ? skills[0] as string[] : skills as string[];
    }

    if (typeof skills === 'object' && skills !== null) {
      // If it's an object with a "skills" property
      const skillsObj = skills as Record<string, unknown>;
      if (skillsObj.skills && Array.isArray(skillsObj.skills)) {
        return skillsObj.skills as string[];
      }
      // If it's an object with other properties
      const values = Object.values(skillsObj);
      if (values.length > 0 && Array.isArray(values[0])) {
        return values[0] as string[];
      }
    }

    if (typeof skills === 'string') {
      return skills.split(',').map(s => s.trim());
    }

    return [];
  };

  // Format certifications from JSON type
  const formatCertifications = (certifications: unknown): string[] => {
    if (Array.isArray(certifications)) {
      return Array.isArray(certifications[0]) ? certifications[0] as string[] : certifications as string[];
    }

    if (typeof certifications === 'object' && certifications !== null) {
      // If it's an object with a "certifications" property
      const certsObj = certifications as Record<string, unknown>;
      if (certsObj.certifications && Array.isArray(certsObj.certifications)) {
        return certsObj.certifications as string[];
      }
      // If it's an object with other properties
      const values = Object.values(certsObj);
      if (values.length > 0 && Array.isArray(values[0])) {
        return values[0] as string[];
      }
    }

    if (typeof certifications === 'string') {
      return certifications.split(',').map(c => c.trim());
    }

    return [];
  };

  // Format languages from JSON type
  const formatLanguages = (languages: unknown): string[] => {
    if (Array.isArray(languages)) {
      return Array.isArray(languages[0]) ? languages[0] as string[] : languages as string[];
    }

    if (typeof languages === 'object' && languages !== null) {
      // If it's an object with a "languages" property
      const langsObj = languages as Record<string, unknown>;
      if (langsObj.languages && Array.isArray(langsObj.languages)) {
        return langsObj.languages as string[];
      }
      // If it's an object with other properties
      const values = Object.values(langsObj);
      if (values.length > 0 && Array.isArray(values[0])) {
        return values[0] as string[];
      }
    }

    if (typeof languages === 'string') {
      return languages.split(',').map(l => l.trim());
    }

    return ['Indonesian']; // Default fallback
  };

  const skills = formatSkills(worker.skills);
  const certifications = formatCertifications(worker.certifications);
  const languages = formatLanguages(worker.languages);

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
                  <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
                    <Briefcase className="text-gray-500" size={60} />
                  </div>
                  <div className="p-6">
                    <h1 className="text-2xl font-bold text-gray-900 mb-1">{worker.name}</h1>
                    <p className="text-purple-600 font-semibold mb-4">{worker.skill}</p>

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
                          <p className="font-semibold text-gray-900">{worker.city}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Briefcase className="text-purple-600 flex-shrink-0" size={18} />
                        <div>
                          <p className="text-xs text-gray-600">Bahasa</p>
                          <p className="font-semibold text-gray-900">{languages.join(", ")}</p>
                        </div>
                      </div>
                    </div>

                    {/* Contact & Actions */}
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          // Create a new window with formatted content for printing
                          const printWindow = window.open('', '_blank');
                          if (!printWindow) {
                            alert('Mohon izinkan pop-up untuk membuka halaman cetak.');
                            return;
                          }

                          const htmlContent = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${worker.name} - Profil Pekerja</title>
  <style>
    @page {
      margin: 20mm;
      size: A4;
      -webkit-print-color-adjust: exact;
      color-adjust: exact;
      print-color-adjust: exact;
    }
    @media print {
      body {
        -webkit-print-color-adjust: exact !important;
        color-adjust: exact !important;
        print-color-adjust: exact !important;
        background: white !important;
      }
    }
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
      color: #333;
      max-width: 210mm; /* A4 width */
      margin: 0 auto;
      background-color: white;
    }
    .header {
      background: linear-gradient(90deg, #6d28d9, #3b82f6);
      color: white;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
    }
    .section {
      margin-bottom: 20px;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
    }
    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin: 16px 0;
    }
    .info-item {
      display: flex;
      flex-direction: column;
    }
    .info-label {
      font-size: 0.8em;
      color: #6b7280;
      margin-bottom: 4px;
    }
    .info-value {
      font-weight: bold;
    }
    h2 { color: #1e40af; }
    h3 { color: #374151; }
    ul {
      padding-left: 20px;
    }
    .skills-container {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .skill-tag {
      background-color: #e0e7ff;
      color: #4f46e5;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.9em;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>${worker.name}</h1>
    <p style="font-size: 1.2em; margin: 5px 0;">${worker.skill || 'Pekerja'}</p>
  </div>

    <div class="section">
    <h2>Informasi Pribadi</h2>
    <div class="info-grid">
      <div class="info-item">
        <span class="info-label">Email</span>
        <span class="info-value">${worker.email}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Telepon</span>
        <span class="info-value">${worker.phone}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Lokasi</span>
        <span class="info-value">${worker.city}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Pengalaman</span>
        <span class="info-value">${worker.experience}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Alamat</span>
        <span class="info-value">${worker.address || 'N/A'}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Tanggal Lahir</span>
        <span class="info-value">${worker.birth_date || 'N/A'}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Pendidikan</span>
        <span class="info-value">${worker.education || 'N/A'}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Bahasa</span>
        <span class="info-value">${languages.join(", ") || 'N/A'}</span>
      </div>
    </div>
  </div>

  <div class="section">
    <h2>Sertifikasi</h2>
    ${certifications.length > 0 ?
                              '<ul>' + certifications.map(cert => `<li>${cert}</li>`).join(' ') + '</ul>' :
                              '<p>Belum ada sertifikasi yang terdaftar.</p>'
                            }
  </div>

  <div class="section">
    <h2>Keahlian</h2>
    <div class="skills-container">
      ${(skills.length > 0 ? skills.map(skill => `<span class="skill-tag">${skill}</span>`).join(' ') : 'Belum ada keahlian yang terdaftar.')}
    </div>
  </div>

  <div class="section">
    <h2>Tentang</h2>
    <div>${worker.description || 'Deskripsi profil tidak tersedia.'}</div>
  </div>

  <div style="text-align: center; margin-top: 30px; color: #6b7280; font-size: 0.9em;">
    Dicetak dari website Disnakertrans Kalteng pada ${new Date().toLocaleString('id-ID')}
  </div>
</body>
</html>`;

                          printWindow.document.write(htmlContent);
                          printWindow.document.close();

                          // Print after content is loaded
                          printWindow.onload = () => {
                            printWindow.focus();
                            setTimeout(() => {
                              printWindow.print();
                            }, 500);
                          };
                        }}
                        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <Printer size={18} />
                        Cetak
                      </button>
                      <button
                        onClick={() => {
                          const htmlContent = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${worker.name} - Profil Pekerja</title>
  <style>
    @page {
      margin: 20mm;
      size: A4;
      -webkit-print-color-adjust: exact;
      color-adjust: exact;
      print-color-adjust: exact;
    }
    @media print {
      body {
        -webkit-print-color-adjust: exact !important;
        color-adjust: exact !important;
        print-color-adjust: exact !important;
        background: white !important;
      }
    }
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 20px;
      color: #333;
      max-width: 210mm; /* A4 width */
      margin: 0 auto;
      background-color: white;
    }
    .header {
      background: linear-gradient(90deg, #6d28d9, #3b82f6);
      color: white;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
    }
    .section {
      margin-bottom: 20px;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
    }
    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin: 16px 0;
    }
    .info-item {
      display: flex;
      flex-direction: column;
    }
    .info-label {
      font-size: 0.8em;
      color: #6b7280;
      margin-bottom: 4px;
    }
    .info-value {
      font-weight: bold;
    }
    h2 { color: #1e40af; }
    h3 { color: #374151; }
    ul {
      padding-left: 20px;
    }
    .skills-container {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .skill-tag {
      background-color: #e0e7ff;
      color: #4f46e5;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.9em;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>${worker.name}</h1>
    <p style="font-size: 1.2em; margin: 5px 0;">${worker.skill || 'Pekerja'}</p>
  </div>

    <div class="section">
    <h2>Informasi Pribadi</h2>
    <div class="info-grid">
      <div class="info-item">
        <span class="info-label">Email</span>
        <span class="info-value">${worker.email}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Telepon</span>
        <span class="info-value">${worker.phone}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Lokasi</span>
        <span class="info-value">${worker.city}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Pengalaman</span>
        <span class="info-value">${worker.experience}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Alamat</span>
        <span class="info-value">${worker.address || 'N/A'}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Tanggal Lahir</span>
        <span class="info-value">${worker.birth_date || 'N/A'}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Pendidikan</span>
        <span class="info-value">${worker.education || 'N/A'}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Bahasa</span>
        <span class="info-value">${languages.join(", ") || 'N/A'}</span>
      </div>
    </div>
  </div>

  <div class="section">
    <h2>Sertifikasi</h2>
    ${certifications.length > 0 ?
                              '<ul>' + certifications.map(cert => `<li>${cert}</li>`).join(' ') + '</ul>' :
                              '<p>Belum ada sertifikasi yang terdaftar.</p>'
                            }
  </div>

  <div class="section">
    <h2>Keahlian</h2>
    <div class="skills-container">
      ${(skills.length > 0 ? skills.map(skill => `<span class="skill-tag">${skill}</span>`).join(' ') : 'Belum ada keahlian yang terdaftar.')}
    </div>
  </div>

  <div class="section">
    <h2>Tentang</h2>
    <div>${worker.description || 'Deskripsi profil tidak tersedia.'}</div>
  </div>

  <div style="text-align: center; margin-top: 30px; color: #6b7280; font-size: 0.9em;">
    Dicetak dari website Disnakertrans Kalteng pada ${new Date().toLocaleString('id-ID')}
  </div>
</body>
</html>`;

                          const blob = new Blob([htmlContent], { type: 'text/html' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `${worker.name.replace(/\s+/g, '_')}_Detail_Lowongan.html`;
                          document.body.appendChild(a);
                          a.click();
                          document.body.removeChild(a);
                          URL.revokeObjectURL(url);
                        }}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        <Download size={18} />
                        Unduh
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
                  <div
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: worker.description || 'Profil pekerja tidak memiliki deskripsi.'
                    }}
                  />
                </div>

                {/* Skills */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Keahlian</h2>
                  <div className="flex flex-wrap gap-3">
                    {skills.map((skill, idx) => (
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
                    {certifications.map((cert, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{cert}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Share */}
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: `${worker.name} - Profil Pekerja`,
                        text: `Lihat profil pekerja ${worker.name} dengan keahlian ${worker.skill} di Kerja Berkah.`,
                        url: window.location.href,
                      }).catch(console.error);
                    } else {
                      // Fallback: copy URL to clipboard
                      navigator.clipboard.writeText(window.location.href).then(() => {
                        alert('Link profil berhasil disalin!');
                      }).catch(() => {
                        // If clipboard API also fails, fallback to a prompt
                        prompt('Salin link profil ini:', window.location.href);
                      });
                    }
                  }}
                  className="w-full bg-purple-100 hover:bg-purple-200 text-purple-600 font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
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
