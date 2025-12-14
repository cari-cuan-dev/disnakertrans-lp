"use client"

import { useState, useEffect, use } from "react";
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"
import { ArrowLeft, MapPin, DollarSign, Clock, Building, Share2, Download, Briefcase, Printer } from "lucide-react"

interface VacancyItem {
  id: string;
  title: string;
  salary_start: string;
  salary_end?: string | null;
  type: unknown;  // JSON type
  description?: string | null;
  benefits?: unknown | null; // JSON type
  created_at?: string | null;

  // Company data
  company_name?: string | null;
  company_location?: string | null;
  company_address?: string | null;
  company_description?: string | null;
  company_hr_name?: string | null;
  company_hr_position?: string | null;
  company_hr_email?: string | null;
  company_hr_phone?: string | null;
}

// Format salary range for display
function formatSalaryRange(start: string, end?: string | null): string {
  const startNum = parseInt(start);
  const endNum = end ? parseInt(end) : null;

  if (endNum) {
    return `Rp ${startNum.toLocaleString('id-ID')} - Rp ${endNum.toLocaleString('id-ID')}`;
  }
  return `Rp ${startNum.toLocaleString('id-ID')}+`;
}

// Get job type for display
function getJobType(type: unknown): string {
  if (typeof type === 'string') {
    return type;
  }

  // If it's an object, try to extract the type
  if (type && typeof type === 'object') {
    const typeObj = type as Record<string, unknown>;
    if (typeObj.type) {
      return String(typeObj.type);
    }
    if (typeObj.name) {
      return String(typeObj.name);
    }
    // If it's an array, return the first element type
    if (Array.isArray(type)) {
      if (type.length > 0) {
        return String(type[0]);
      }
      return 'Full Time';
    }
  }

  return 'Full Time'; // Default fallback
}

export default function JobDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [vacancy, setVacancy] = useState<VacancyItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVacancy = async () => {
      try {
        setLoading(true);

        const response = await fetch(`/api/vacancies/${id}`);
        if (response.ok) {
          const vacancyData: VacancyItem = await response.json();
          setVacancy(vacancyData);
        } else if (response.status === 404) {
          setVacancy(null);
        } else {
          console.error('Failed to fetch vacancy:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching vacancy:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchVacancy();
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
                <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-6"></div>
                <div className="space-y-6">
                  <div className="h-80 bg-gray-200 rounded-lg"></div>
                  <div className="p-8">
                    <div className="flex justify-between mb-6">
                      <div>
                        <div className="h-10 bg-gray-300 rounded w-1/2 mb-4"></div>
                        <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
                      </div>
                      <div className="h-10 w-32 bg-gray-300 rounded"></div>
                    </div>
                    <div className="grid md:grid-cols-4 gap-4 mb-8 pb-8 border-b border-gray-200">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-12 bg-gray-300 rounded"></div>
                      ))}
                    </div>
                    <div className="mb-8">
                      <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
                      <div className="space-y-2">
                        <div className="h-4 bg-gray-300 rounded"></div>
                        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-300 rounded w-4/6"></div>
                      </div>
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

  if (!vacancy) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen bg-white">
          <section className="py-12 px-4">
            <div className="max-w-6xl mx-auto text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Lowongan tidak ditemukan</h1>
              <Link
                href="/kerja-berkah/lowongan"
                className="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Kembali ke Daftar Lowongan
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </>
    )
  }

  // Format salary using the helper function
  const salary = formatSalaryRange(vacancy.salary_start, vacancy.salary_end);

  // Get job type
  const jobType = getJobType(vacancy.type);

  // Format posting date
  const postedDate = vacancy.created_at ? new Date(vacancy.created_at).toISOString().split('T')[0] : 'N/A';

  // Format benefits from JSON
  let benefits: string[] = [];
  if (vacancy.benefits) {
    if (Array.isArray(vacancy.benefits)) {
      // If benefits is directly an array
      benefits = vacancy.benefits.map((b: any) => String(b));
    } else if (typeof vacancy.benefits === 'object' && vacancy.benefits !== null) {
      // If benefits is an object that might contain an array
      const benefitsObj = vacancy.benefits as Record<string, unknown>;
      if (benefitsObj.benefits && Array.isArray(benefitsObj.benefits)) {
        benefits = benefitsObj.benefits.map((b: any) => String(b));
      }
    }
  }

  // Function to handle HTML download
  const handleDownloadPDF = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${vacancy.title} - Detail Lowongan</title>
  <style>
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
    .hr-section {
      background-color: #dbeafe;
      border-left: 4px solid #3b82f6;
    }
    .benefit-item {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
    }
    .benefit-marker {
      width: 8px;
      height: 8px;
      background-color: #6d28d9;
      border-radius: 50%;
      flex-shrink: 0;
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
    h1 { color: white; } /* Judul menjadi putih di background ungu-biru */
    h2 { color: #1e40af; }
    h3 { color: #374151; }
  </style>
</head>
<body>
  <div class="header">
    <h1>${vacancy.title}</h1>
    <p style="font-size: 1.2em; margin: 5px 0;">${vacancy.company_name}</p>
  </div>

  <div class="section">
    <h2>Deskripsi Pekerjaan</h2>
    <div>${vacancy.description || 'Deskripsi pekerjaan tidak tersedia.'}</div>
  </div>

  <div class="section">
    <h2>Detail Pekerjaan</h2>
    <div class="info-grid">
      <div class="info-item">
        <span class="info-label">Lokasi</span>
        <span class="info-value">${vacancy.company_location || 'Indonesia'}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Gaji</span>
        <span class="info-value">${salary}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Tipe</span>
        <span class="info-value">${jobType}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Diposting</span>
        <span class="info-value">${postedDate}</span>
      </div>
    </div>
  </div>

  ${benefits.length > 0 ? `
  <div class="section">
    <h2>Benefit</h2>
    <div>
      ${benefits.map(benefit => `
        <div class="benefit-item">
          <div class="benefit-marker"></div>
          <span>${benefit}</span>
        </div>
      `).join('')}
    </div>
  </div>
  ` : ''}

  ${(vacancy.company_hr_name || vacancy.company_hr_email || vacancy.company_hr_phone || vacancy.company_hr_position) ? `
  <div class="section hr-section">
    <h2>Kontak HR Perusahaan</h2>
    <div class="info-grid">
      ${vacancy.company_hr_name ? `
      <div class="info-item">
        <span class="info-label">Nama</span>
        <span class="info-value">${vacancy.company_hr_name}</span>
      </div>
      ` : ''}
      ${vacancy.company_hr_position ? `
      <div class="info-item">
        <span class="info-label">Jabatan</span>
        <span class="info-value">${vacancy.company_hr_position}</span>
      </div>
      ` : ''}
      ${vacancy.company_hr_email ? `
      <div class="info-item">
        <span class="info-label">Email</span>
        <span class="info-value">${vacancy.company_hr_email}</span>
      </div>
      ` : ''}
      ${vacancy.company_hr_phone ? `
      <div class="info-item">
        <span class="info-label">Telepon</span>
        <span class="info-value">${vacancy.company_hr_phone}</span>
      </div>
      ` : ''}
    </div>
  </div>
  ` : ''}

  <div style="text-align: center; margin-top: 30px; color: #6b7280; font-size: 0.9em;">
    Dicetak dari website Disnakertrans Kalteng pada ${new Date().toLocaleString('id-ID')}
  </div>
</body>
</html>`;

    // Create a blob and download it as HTML
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${vacancy.title.replace(/\s+/g, '_')}_Detail_Lowongan.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Function to handle print with background
  const handlePrint = () => {
    // Create a new window with styled content that resembles the web page
    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      alert('Mohon izinkan popup untuk mencetak.');
      return;
    }

    const htmlContent = `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${vacancy.title} - Detail Lowongan</title>
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
      .header {
        background: linear-gradient(90deg, #6d28d9, #3b82f6) !important;
        color: white !important;
      }
      h1 {
        color: white !important;
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
    .hr-section {
      background-color: #dbeafe;
      border-left: 4px solid #3b82f6;
    }
    .benefit-item {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
    }
    .benefit-marker {
      width: 8px;
      height: 8px;
      background-color: #6d28d9;
      border-radius: 50%;
      flex-shrink: 0;
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
    h1 { color: white; } /* Judul menjadi putih di background ungu-biru */
    h2 { color: #1e40af; }
    h3 { color: #374151; }
    /* Force background colors and images to print */
    * {
      -webkit-print-color-adjust: exact !important;
      color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>${vacancy.title}</h1>
    <p style="font-size: 1.2em; margin: 5px 0;">${vacancy.company_name}</p>
  </div>

  <div class="section">
    <h2>Deskripsi Pekerjaan</h2>
    <div>${vacancy.description || 'Deskripsi pekerjaan tidak tersedia.'}</div>
  </div>

  <div class="section">
    <h2>Detail Pekerjaan</h2>
    <div class="info-grid">
      <div class="info-item">
        <span class="info-label">Lokasi</span>
        <span class="info-value">${vacancy.company_location || 'Indonesia'}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Gaji</span>
        <span class="info-value">${salary}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Tipe</span>
        <span class="info-value">${jobType}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Diposting</span>
        <span class="info-value">${postedDate}</span>
      </div>
    </div>
  </div>

  ${benefits.length > 0 ? `
  <div class="section">
    <h2>Benefit</h2>
    <div>
      ${benefits.map(benefit => `
        <div class="benefit-item">
          <div class="benefit-marker"></div>
          <span>${benefit}</span>
        </div>
      `).join('')}
    </div>
  </div>
  ` : ''}

  ${(vacancy.company_hr_name || vacancy.company_hr_email || vacancy.company_hr_phone || vacancy.company_hr_position) ? `
  <div class="section hr-section">
    <h2>Kontak HR Perusahaan</h2>
    <div class="info-grid">
      ${vacancy.company_hr_name ? `
      <div class="info-item">
        <span class="info-label">Nama</span>
        <span class="info-value">${vacancy.company_hr_name}</span>
      </div>
      ` : ''}
      ${vacancy.company_hr_position ? `
      <div class="info-item">
        <span class="info-label">Jabatan</span>
        <span class="info-value">${vacancy.company_hr_position}</span>
      </div>
      ` : ''}
      ${vacancy.company_hr_email ? `
      <div class="info-item">
        <span class="info-label">Email</span>
        <span class="info-value">${vacancy.company_hr_email}</span>
      </div>
      ` : ''}
      ${vacancy.company_hr_phone ? `
      <div class="info-item">
        <span class="info-label">Telepon</span>
        <span class="info-value">${vacancy.company_hr_phone}</span>
      </div>
      ` : ''}
    </div>
  </div>
  ` : ''}

  <div style="text-align: center; margin-top: 30px; color: #6b7280; font-size: 0.9em;">
    Dicetak dari website Disnakertrans Kalteng pada ${new Date().toLocaleString('id-ID')}
  </div>
</body>
</html>`;

    printWindow.document.write(htmlContent);
    printWindow.document.close();

    // Delay print to ensure content is loaded
    printWindow.onload = () => {
      printWindow.print();
    };
  };

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
              <div className="w-full h-80 bg-gray-200 flex items-center justify-center">
                <Briefcase className="text-gray-500" size={80} />
              </div>

              {/* Details */}
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">{vacancy.title}</h1>
                    <p className="text-xl text-purple-600 font-semibold mb-4">{vacancy.company_name}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: vacancy.title,
                            text: `Lihat lowongan kerja: ${vacancy.title} di ${vacancy.company_name}`,
                            url: window.location.href,
                          }).catch(console.error);
                        } else {
                          // Fallback: copy URL to clipboard
                          navigator.clipboard.writeText(window.location.href).then(() => {
                            alert('Link berhasil disalin!');
                          }).catch(() => {
                            // If clipboard API also fails, fallback to a prompt
                            prompt('Salin link ini:', window.location.href);
                          });
                        }
                      }}
                      className="bg-purple-100 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-200 transition-colors flex items-center gap-2"
                    >
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
                      <p className="font-semibold text-gray-900">{vacancy.company_location || 'Indonesia'}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <DollarSign className="text-blue-600 flex-shrink-0" size={20} />
                    <div>
                      <p className="text-sm text-gray-600">Gaji</p>
                      <p className="font-semibold text-gray-900">{salary}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Clock className="text-purple-600 flex-shrink-0" size={20} />
                    <div>
                      <p className="text-sm text-gray-600">Tipe</p>
                      <p className="font-semibold text-gray-900">{jobType}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Building className="text-blue-600 flex-shrink-0" size={20} />
                    <div>
                      <p className="text-sm text-gray-600">Diposting</p>
                      <p className="font-semibold text-gray-900">{postedDate}</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Deskripsi Pekerjaan</h2>
                  <div
                    className="text-gray-700 leading-relaxed [&_p]:mb-4 [&_h1]:text-2xl [&_h1]:font-bold [&_h2]:text-xl [&_h2]:font-semibold [&_h3]:text-lg [&_h3]:font-medium [&_ul]:list-disc [&_ul]:ps-6 [&_ol]:list-decimal [&_ol]:ps-6 [&_li]:mb-1 [&_strong]:font-bold [&_em]:italic [&_a]:text-purple-600 [&_a]:underline"
                    dangerouslySetInnerHTML={{
                      __html: vacancy.description || 'Deskripsi pekerjaan tidak tersedia.'
                    }}
                  />
                </div>

                {/* Benefits */}
                {benefits.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Benefit</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      {benefits.map((benefit, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-purple-50 p-4 rounded-lg">
                          <div className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0"></div>
                          <p className="text-gray-700">{benefit}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* HR Contact Information */}
                {(vacancy.company_hr_name || vacancy.company_hr_email || vacancy.company_hr_phone) && (
                  <div className="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Kontak HR Perusahaan</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {vacancy.company_hr_name && (
                        <div className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-blue-600 font-semibold">
                              {vacancy.company_hr_name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-wide text-gray-500 font-medium">Nama</p>
                            <p className="font-semibold text-gray-900 break-words">{vacancy.company_hr_name}</p>
                          </div>
                        </div>
                      )}
                      {vacancy.company_hr_position && (
                        <div className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <Building className="text-blue-600" size={18} />
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-wide text-gray-500 font-medium">Jabatan</p>
                            <p className="font-semibold text-gray-900 break-words">{vacancy.company_hr_position}</p>
                          </div>
                        </div>
                      )}
                      {vacancy.company_hr_email && (
                        <div className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-blue-600 font-semibold">@</span>
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-wide text-gray-500 font-medium">Email</p>
                            <a
                              href={`mailto:${vacancy.company_hr_email}`}
                              className="font-semibold text-purple-600 hover:underline break-words"
                            >
                              {vacancy.company_hr_email}
                            </a>
                          </div>
                        </div>
                      )}
                      {vacancy.company_hr_phone && (
                        <div className="flex items-center gap-3 bg-white p-4 rounded-lg border border-gray-200">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-blue-600 font-semibold">T</span>
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-wide text-gray-500 font-medium">Telepon</p>
                            <a
                              href={`tel:${vacancy.company_hr_phone}`}
                              className="font-semibold text-purple-600 hover:underline break-words"
                            >
                              {vacancy.company_hr_phone}
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="flex flex-wrap gap-4">
                  {/* <button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-3 rounded-lg transition-all">
                    Lamar Sekarang
                  </button> */}
                  <button
                    onClick={handlePrint}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Printer size={18} />
                    Print
                  </button>
                  <button
                    onClick={handleDownloadPDF}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <Download size={18} />
                    Unduh HTML
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
