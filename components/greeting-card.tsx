"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface OpeningSpeechItem {
  id: string;
  type: string;
  role: string;
  name: string;
  image_path: string;
  speech: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export default function GreetingCard() {
  const [firstPerson, setFirstPerson] = useState<OpeningSpeechItem | null>(null);
  const [secondPerson, setSecondPerson] = useState<OpeningSpeechItem | null>(null);
  const [thirdPerson, setThirdPerson] = useState<OpeningSpeechItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOpeningSpeeches = async () => {
      try {
        const response = await fetch('/api/opening-speeches');
        if (response.ok) {
          const data: OpeningSpeechItem[] = await response.json();

          const firstPersonData = data.find(item => item.type === 'First Person');
          const secondPersonData = data.find(item => item.type === 'Second Person');
          const thirdPersonData = data.find(item => item.type === 'Third Person');

          setFirstPerson(firstPersonData || null);
          setSecondPerson(secondPersonData || null);
          setThirdPerson(thirdPersonData || null);
        } else {
          console.error('Failed to fetch opening speeches:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching opening speeches:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOpeningSpeeches();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Kata Sambutan</h2>
            <p className="mt-2 text-lg text-gray-600">Dari Pimpinan Daerah</p>
          </div>

          <div className="flex justify-center gap-8 mb-12">
            {[1, 2].map((_, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-purple-100 bg-gray-200 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-32 mt-3 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-24 mt-1 animate-pulse"></div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-shrink-0">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-purple-100 bg-gray-200 animate-pulse"></div>
              </div>
              <div className="flex-1">
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((_, index) => (
                    <div key={index} className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Kata Sambutan</h2>
          <p className="mt-2 text-lg text-gray-600">Dari Pimpinan Daerah</p>
        </div>

        {/* Baris pertama: dua foto pejabat */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {/* Foto First Person */}
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-purple-100">
              {firstPerson ? (
                <Image
                  src={firstPerson.image_path || "/placeholder-person.jpg"}
                  alt={firstPerson.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 200px) 100vw, 200px"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; // prevents looping
                    target.src = "/placeholder-person.jpg"; // fallback to placeholder
                  }}
                />
              ) : (
                <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                  <span className="text-gray-500">Foto</span>
                </div>
              )}
            </div>
            {firstPerson ? (
              <>
                <h3 className="text-lg font-bold text-gray-900 mt-3">{firstPerson.name}</h3>
                <p className="text-purple-600 text-sm">{firstPerson.role}</p>
              </>
            ) : (
              <>
                <h3 className="text-lg font-bold text-gray-900 mt-3">-</h3>
                <p className="text-purple-600 text-sm">-</p>
              </>
            )}
          </div>

          {/* Foto Second Person */}
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-purple-100">
              {secondPerson ? (
                <Image
                  src={secondPerson.image_path || "/placeholder-person.jpg"}
                  alt={secondPerson.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 200px) 100vw, 200px"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; // prevents looping
                    target.src = "/placeholder-person.jpg"; // fallback to placeholder
                  }}
                />
              ) : (
                <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                  <span className="text-gray-500">Foto</span>
                </div>
              )}
            </div>
            {secondPerson ? (
              <>
                <h3 className="text-lg font-bold text-gray-900 mt-3">{secondPerson.name}</h3>
                <p className="text-purple-600 text-sm">{secondPerson.role}</p>
              </>
            ) : (
              <>
                <h3 className="text-lg font-bold text-gray-900 mt-3">-</h3>
                <p className="text-purple-600 text-sm">-</p>
              </>
            )}
          </div>
        </div>

        {/* Baris kedua: foto kepala dinas dan kata sambutan */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 p-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-purple-100">
                {thirdPerson ? (
                  <Image
                    src={thirdPerson.image_path || "/placeholder-person.jpg"}
                    alt={thirdPerson.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 200px) 100vw, 200px"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null; // prevents looping
                      target.src = "/placeholder-person.jpg"; // fallback to placeholder
                    }}
                  />
                ) : (
                  <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                    <span className="text-gray-500">Foto</span>
                  </div>
                )}
              </div>
              {thirdPerson ? (
                <>
                  <h3 className="text-lg font-bold text-gray-900 mt-3">{thirdPerson.name}</h3>
                  <p className="text-purple-600 text-sm">{thirdPerson.role}</p>
                </>
              ) : (
                <>
                  <h3 className="text-lg font-bold text-gray-900 mt-3">-</h3>
                  <p className="text-purple-600 text-sm">-</p>
                </>
              )}
            </div>

            <div className="flex-1">
              <div
                className="text-gray-700 text-left prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: thirdPerson?.speech || '<p class="italic text-gray-500">Kata sambutan belum tersedia.</p>' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}