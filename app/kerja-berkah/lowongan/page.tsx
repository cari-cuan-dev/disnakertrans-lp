"use client"

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"
import ProtectedRoute from "@/lib/protected-route";
import { Briefcase, MapPin, DollarSign, Clock, ArrowLeft, Eye } from "lucide-react"

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

function LowonganPageContent() {
  const searchParams = useSearchParams();
  const [vacancies, setVacancies] = useState<VacancyItem[]>([]);
  const [loading, setLoading] = useState(true);

  const query = searchParams.get("q") || "";
  const location = searchParams.get("location") || "all";
  const type = searchParams.get("type") || "all";

  useEffect(() => {
    const fetchVacancies = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams();
        if (query) params.append('q', query);
        if (location && location !== 'all') params.append('location', location);
        if (type && type !== 'all') params.append('type', type);

        const response = await fetch(`/api/vacancies?${params.toString()}`);
        if (response.ok) {
          const data: VacancyItem[] = await response.json();
          setVacancies(data);
        } else {
          console.error('Failed to fetch vacancies:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching vacancies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVacancies();
  }, [query, location, type]);

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Header */}
        <section className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 text-white py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <Link
              href="/kerja-berkah"
              className="flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity w-fit"
            >
              <ArrowLeft size={20} />
              Kembali
            </Link>
            <h1 className="text-4xl font-bold mb-4">Lowongan Kerja</h1>
            <p className="text-lg text-purple-100">
              Ditemukan {vacancies.length} lowongan kerja {query && `untuk "${query}"`}
            </p>
          </div>
        </section>

        {/* Results */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-pulse">
                  <div className="space-y-6">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="bg-white rounded-lg shadow-md p-6 flex gap-6 items-start">
                        <div className="w-32 h-32 rounded-lg bg-gray-200"></div>
                        <div className="flex-1">
                          <div className="h-6 bg-gray-300 rounded w-3/4 mb-4"></div>
                          <div className="h-4 bg-gray-300 rounded w-1/2 mb-3"></div>
                          <div className="space-y-2 mb-4">
                            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                            <div className="h-4 bg-gray-300 rounded w-4/6"></div>
                          </div>
                          <div className="flex gap-4">
                            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : vacancies.length > 0 ? (
              <div className="grid gap-6">
                {vacancies.map((vacancy) => {
                  // Format salary using the helper function
                  const salary = formatSalaryRange(vacancy.salary_start, vacancy.salary_end);

                  // Get job type
                  const jobType = getJobType(vacancy.type);

                  return (
                    <Link
                      key={vacancy.id}
                      href={`/kerja-berkah/lowongan/${vacancy.id}`}
                      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-purple-600 p-6 flex gap-6 items-start"
                    >
                      <div className="w-32 h-32 rounded-lg bg-gray-200 flex items-center justify-center flex-shrink-0">
                        <Briefcase className="text-gray-500" size={40} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2 hover:text-purple-600 transition-colors">
                          {vacancy.title}
                        </h3>
                        <p className="text-gray-700 font-semibold mb-3">{vacancy.company_name}</p>
                        <div
                          className="text-gray-600 mb-4 line-clamp-2"
                          dangerouslySetInnerHTML={{
                            __html: vacancy.description ? vacancy.description.replace(/<[^>]*>/g, '').substring(0, 100) + '...' : 'Deskripsi lowongan tidak tersedia.'
                          }}
                        />
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <MapPin size={16} className="text-purple-600" />
                            {vacancy.company_location || 'Indonesia'}
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign size={16} className="text-blue-600" />
                            {salary}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={16} className="text-purple-600" />
                            {jobType}
                          </div>
                        </div>
                      </div>
                      <Eye className="text-gray-400 flex-shrink-0" size={20} />
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg">
                <Briefcase size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Tidak ada lowongan ditemukan</h3>
                <p className="text-gray-600 mb-6">Coba ubah filter pencarian Anda</p>
                <Link
                  href="/kerja-berkah"
                  className="inline-block bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  Kembali ke Pencarian
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default function ProtectedLowonganPage() {
  return (
    <ProtectedRoute>
      <LowonganPageContent />
    </ProtectedRoute>
  );
}
