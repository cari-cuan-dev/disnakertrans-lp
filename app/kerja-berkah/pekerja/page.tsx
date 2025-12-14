"use client"

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import Link from "next/link"
import ProtectedRoute from "@/lib/protected-route";
import { MapPin, Briefcase, Award, ArrowLeft } from "lucide-react"

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

function PekerjaPageContent() {
  const searchParams = useSearchParams();
  const [workers, setWorkers] = useState<WorkerItem[]>([]);
  const [loading, setLoading] = useState(true);

  const query = searchParams.get("q") || "";
  const experience = searchParams.get("experience") || "all";
  const location = searchParams.get("location") || "all";

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams();
        if (query) params.append('q', query);
        if (experience && experience !== 'all') params.append('experience', experience);
        if (location && location !== 'all') params.append('location', location);

        const response = await fetch(`/api/workers?${params.toString()}`);
        if (response.ok) {
          const data: WorkerItem[] = await response.json();
          setWorkers(data);
        } else {
          console.error('Failed to fetch workers:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching workers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkers();
  }, [query, experience, location]);

  // Handle skills properly since they're JSON type
  const formatSkillsForDisplay = (skills: unknown): string => {
    if (typeof skills === 'string') {
      return skills;
    }

    if (Array.isArray(skills)) {
      return Array.isArray(skills[0]) ? skills[0].join(', ') : skills.join(', ');
    }

    if (typeof skills === 'object' && skills !== null) {
      // If it's an object with a "skills" property
      const skillsObj = skills as Record<string, unknown>;
      if (skillsObj.skills && Array.isArray(skillsObj.skills)) {
        return (skillsObj.skills as string[]).join(', ');
      }
      // If it's an object with other properties
      const values = Object.values(skillsObj);
      if (values.length > 0) {
        return Array.isArray(values[0]) ? (values[0] as string[]).join(', ') : String(values[0]);
      }
    }

    return 'Skills not specified';
  };

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
            <h1 className="text-4xl font-bold mb-4">Database Pekerja</h1>
            <p className="text-lg text-purple-100">
              Ditemukan {workers.length} pekerja {query && `untuk "${query}"`}
            </p>
          </div>
        </section>

        {/* Results */}
        <section className="py-12 px-4">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-pulse">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden border-t-4 border-purple-600">
                        <div className="h-48 bg-gray-200"></div>
                        <div className="p-6">
                          <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                          <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
                          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                          <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
                          <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : workers.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {workers.map((worker) => (
                  <Link
                    key={worker.id}
                    href={`/kerja-berkah/pekerja/${worker.id}`}
                    className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border-t-4 border-purple-600 group"
                  >
                    <div className="relative overflow-hidden h-48 bg-gray-200 flex items-center justify-center">
                      <div className="bg-gray-300 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center">
                        <Briefcase className="text-gray-500" size={40} />
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                        {worker.name}
                      </h3>
                      <p className="text-purple-600 font-semibold mb-3">{worker.skill || formatSkillsForDisplay(worker.skills)}</p>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {worker.description
                          ? worker.description.replace(/<[^>]*>/g, '').substring(0, 100) + '...'
                          : 'Pekerja dengan pengalaman dan keterampilan.'}
                      </p>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Award size={14} className="text-purple-600" />
                          {worker.experience}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={14} className="text-blue-600" />
                          {worker.city}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg">
                <Briefcase size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Tidak ada pekerja ditemukan</h3>
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

export default function ProtectedPekerjaPage() {
  return (
    <ProtectedRoute>
      <PekerjaPageContent />
    </ProtectedRoute>
  );
}
