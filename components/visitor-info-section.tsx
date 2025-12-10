"use client"

import { Info, MapPin, Calendar, Users } from "lucide-react";
import { useState, useEffect } from "react";

export interface NoteVisitorItem {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  created_at?: string | null;
  updated_at?: string | null;
  status: boolean;
}

// Dynamic Icon Loader Component for Iconoir (similar to previous implementation)
const IconoirLoader = ({ iconName, size = 24, className = "text-white" }: { iconName: string; size?: number; className?: string }) => {
  const [IconComponent, setIconComponent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const loadIcon = async () => {
      // try {
      //   // Attempt to load @iconoir/react
      //   const iconoirModule = await import('@iconoir/react');

      //   // Look for the icon in Iconoir module using the exact name from database
      //   if (iconoirModule[iconName]) {
      //     setIconComponent(() => iconoirModule[iconName]);
      //   } else {
      //     setError(true);
      //   }
      // } catch (loadError) {
      //   console.warn(`Iconoir not available or icon "${iconName}" not found in Iconoir:`, loadError);
      //   setError(true);
      // } finally {
      //   setLoading(false);
      // }
    };

    loadIcon();
  }, [iconName]);

  if (loading || error || !IconComponent) {
    // If Iconoir is not available or icon not found, render a simple fallback
    return (
      <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
        <span className="text-xs text-white text-center leading-none">{iconName.substring(0, 2)}</span>
      </div>
    );
  }

  return <IconComponent size={size} className={className} />;
};

export default function VisitorInfoSection() {
  const [noteVisitors, setNoteVisitors] = useState<NoteVisitorItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNoteVisitors = async () => {
      try {
        const response = await fetch('/api/note-visitors');
        if (response.ok) {
          const data: NoteVisitorItem[] = await response.json();
          setNoteVisitors(data);
        } else {
          console.error('Failed to fetch note visitors:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching note visitors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNoteVisitors();
  }, []);

  if (loading) {
    return (
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Info Pengunjung</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200/30 animate-pulse"
              >
                <div className="w-12 h-12 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full mb-1"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">Info Pengunjung</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {noteVisitors.map((item) => (
            <div
              key={item.id}
              className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200/30 hover:border-purple-300 transition-all"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                <IconoirLoader iconName={item.icon} size={24} className="text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 whitespace-pre-line">{item.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
