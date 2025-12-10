"use client"

import { ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

export interface QuickAccessItem {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  type: string;
  category_id: string | null;
  blog_id: string | null;
  url: string | null;
  status: boolean;
  created_at: string | null;
  updated_at: string | null;
  blogs?: {
    id: string;
    title: string;
  } | null;
  categories?: {
    id: string;
    name: string;
  } | null;
}

// Dynamic Icon Loader Component for Iconoir (with fallback)
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
    // You can customize this fallback or add other icon systems here
    return (
      <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
        <span className="text-xs text-white text-center leading-none">{iconName.substring(0, 2)}</span>
      </div>
    );
  }

  return <IconComponent size={size} className={className} />;
};

export default function QuickAccessSection() {
  const [quickAccessItems, setQuickAccessItems] = useState<QuickAccessItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuickAccess = async () => {
      try {
        const response = await fetch('/api/quick-access');
        if (response.ok) {
          const data: QuickAccessItem[] = await response.json();
          setQuickAccessItems(data);
        } else {
          console.error('Failed to fetch quick access items:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching quick access items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuickAccess();
  }, []);

  const getLinkUrl = (item: QuickAccessItem) => {
    if (item.type.toLowerCase() === 'redirect' && item.url) {
      // For redirect type, use the provided URL
      return item.url;
    } else if (item.type.toLowerCase() === 'category' && item.categories) {
      // For category type, link to blog with category filter
      return `/blog?category=${encodeURIComponent(item.categories.name)}`;
    } else if (item.type.toLowerCase() === 'blog' && item.blogs) {
      // For blog type, link directly to the blog post
      return `/blog/${item.blogs.id}`;
    } else {
      // Default fallback
      return '#';
    }
  };

  if (loading) {
    return (
      <section className="py-12 md:py-20 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-balance">Akses Cepat</h2>
            <p className="text-purple-100 text-lg">Jelajahi layanan utama Disnakertrans Kalteng</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 animate-pulse"
              >
                <div className="w-12 h-12 bg-white/20 rounded-lg mb-4"></div>
                <div className="h-5 bg-white/20 rounded mb-2"></div>
                <div className="h-3 bg-white/20 rounded w-2/3 mb-4"></div>
                <div className="h-4 bg-white/20 rounded w-1/4"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-20 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 text-balance">Akses Cepat</h2>
          <p className="text-purple-100 text-lg">Jelajahi layanan utama Disnakertrans Kalteng</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickAccessItems.map((item) => {
            const linkUrl = getLinkUrl(item);
            
            return (
              <Link
                key={item.id}
                href={linkUrl}
                className="group bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/40 rounded-xl p-6 cursor-pointer transition-all block"
              >
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-white/30 transition-colors">
                  <IconoirLoader iconName={item.icon} size={24} className="text-white" />
                </div>
                <h3 className="font-bold text-white mb-2 group-hover:text-purple-100 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-purple-100 group-hover:text-white/90 transition-colors">
                  {item.subtitle}
                </p>
                <div className="mt-4 flex items-center text-white/70 group-hover:text-white transition-colors">
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  )
}