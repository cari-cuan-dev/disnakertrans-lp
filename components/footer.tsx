"use client"

import { Facebook, Twitter, Linkedin, Instagram, Mail, MapPin, Phone } from "lucide-react"
import { useState, useEffect } from "react"

interface SocialMediaItem {
  id: string;  // bigint is serialized as string in JSON
  icon: string;
  color: string;
  name: string;
  url: string | null;
  status: boolean;
  sort: number;
  created_at?: string | null;
  updated_at?: string | null;
}

export default function Footer() {
  const [socialMedia, setSocialMedia] = useState<SocialMediaItem[]>([]);
  const [socialMediaLoading, setSocialMediaLoading] = useState(true);
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    const fetchSocialMedia = async () => {
      try {
        const response = await fetch('/api/social-media');
        if (response.ok) {
          const data: SocialMediaItem[] = await response.json();
          setSocialMedia(data);
        } else {
          console.error('Failed to fetch social media:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching social media:', error);
      } finally {
        setSocialMediaLoading(false);
      }
    };

    fetchSocialMedia();
  }, []);

  // Map social media names to Lucide icons
  const getSocialIcon = (name: string) => {
    switch(name.toLowerCase()) {
      case 'facebook':
        return Facebook;
      case 'twitter':
      case 'x':
        return Twitter;
      case 'instagram':
        return Instagram;
      case 'linkedin':
        return Linkedin;
      default:
        // Generic icon or name-based logic
        return ({ size }: { size: number }) => (
          <div style={{ width: size, height: size }} />
        );
    }
  };

  // Get appropriate hover color for the icon
  const getSocialHoverColor = (name: string) => {
    switch(name.toLowerCase()) {
      case 'facebook':
        return 'hover:text-blue-600';
      case 'twitter':
      case 'x':
        return 'hover:text-blue-400';
      case 'instagram':
        return 'hover:text-pink-600';
      case 'linkedin':
        return 'hover:text-blue-700';
      default:
        return 'hover:text-gray-700';
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">D</span>
              </div>
              <span className="font-bold text-white">Disnakertrans</span>
            </div>
            <p className="text-sm text-gray-400">Dinas Ketenagakerjaan dan Perindustrian Kalimantan Tengah</p>
          </div>

          {/* Layanan */}
          <div>
            <h3 className="font-bold text-white mb-4">Layanan</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">
                  Portal Lowongan Kerja
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">
                  Sertifikasi BNSP
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">
                  Kerja Berkah
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">
                  PPID
                </a>
              </li>
            </ul>
          </div>

          {/* Informasi */}
          <div>
            <h3 className="font-bold text-white mb-4">Informasi</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">
                  Berita
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">
                  Dokumentasi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-purple-400 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Kontak */}
          <div>
            <h3 className="font-bold text-white mb-4">Hubungi Kami</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 flex-shrink-0" />
                <span>Jl. Semangat No. 123, Palangka Raya</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <a href="tel:+62536123456" className="hover:text-purple-400 transition-colors">
                  (0536) 123-4567
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:info@disnakertrans.go.id" className="hover:text-purple-400 transition-colors">
                  info@disnakertrans.go.id
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <h3 className="font-bold text-white mb-4">Ikuti Kami</h3>
          <div className="flex gap-4">
            {!socialMediaLoading && socialMedia.length > 0 ? (
              socialMedia.map((social) => {
                if (!social.url) return null;
                const IconComponent = getSocialIcon(social.name);
                return (
                  <a
                    key={social.id}
                    href={social.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors ${getSocialHoverColor(social.name)}`}
                    aria-label={social.name}
                  >
                    <IconComponent size={18} className="text-current" />
                  </a>
                );
              })
            ) : (
              // Show loading placeholders only
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-gray-800 rounded-lg animate-pulse"></div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg animate-pulse"></div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg animate-pulse"></div>
                <div className="w-10 h-10 bg-gray-800 rounded-lg animate-pulse"></div>
              </div>
            )}
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; {currentYear} Disnakertrans Kalteng. Semua hak dilindungi.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="hover:text-purple-400 transition-colors">
                Kebijakan Privasi
              </a>
              <span>•</span>
              <a href="#" className="hover:text-purple-400 transition-colors">
                Syarat & Ketentuan
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
