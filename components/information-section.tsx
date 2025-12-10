"use client"

import { useState, useEffect } from "react";

export interface AboutItem {
  id: string;
  type: string;
  content: string;
  status: boolean;
  created_at?: string | null;
  updated_at?: string | null;
}

export default function InformationSection() {
  const [description, setDescription] = useState<string>('');
  const [vision, setVision] = useState<string>('');
  const [missions, setMissions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbouts = async () => {
      try {
        // Fetch description type
        const descResponse = await fetch('/api/abouts?type=Description');
        if (descResponse.ok) {
          const descData: AboutItem[] = await descResponse.json();
          if (descData.length > 0) {
            setDescription(descData[0].content);
          }
        }

        // Fetch vision type
        const visionResponse = await fetch('/api/abouts?type=Vision'); // Note: using the typo as in the schema
        if (visionResponse.ok) {
          const visionData: AboutItem[] = await visionResponse.json();
          if (visionData.length > 0) {
            setVision(visionData[0].content);
          }
        }

        // Fetch mission type
        const missionResponse = await fetch('/api/abouts?type=Mission');
        if (missionResponse.ok) {
          const missionData: AboutItem[] = await missionResponse.json();
          if (missionData.length > 0) {
            // Split content by newlines or common separators for mission list items
            const missionList = missionData[0].content.split(/\n|\r\n|<br\s*\/?>|-|•/).filter(item => item.trim() !== '');
            setMissions(missionList);
          }
        }
      } catch (error) {
        console.error('Error fetching about items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAbouts();
  }, []);

  if (loading) {
    return (
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Tentang Disnakertrans</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>

            <div className="bg-white rounded-xl p-8 border border-purple-200/50 animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
              <div className="space-y-6">
                <div>
                  <div className="h-4 bg-gray-200 rounded w-1/6 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
                <div>
                  <div className="h-4 bg-gray-200 rounded w-1/6 mb-2"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-full"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Tentang Disnakertrans</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Description */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Penjelasan Disnakertrans Kalteng</h3>
            <div
              className="text-gray-600"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </div>

          {/* Right - Vision & Mission */}
          <div className="bg-white rounded-xl p-8 border border-purple-200/50">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Visi & Misi</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-purple-600 mb-2">Visi</h4>
                <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: vision }} />
              </div>
              <div>
                <h4 className="font-bold text-purple-600 mb-2">Misi</h4>
                <ul className="text-gray-600 space-y-2 list-disc list-inside">
                  {missions.map((mission, index) => (
                    <li key={index} dangerouslySetInnerHTML={{ __html: mission }} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
