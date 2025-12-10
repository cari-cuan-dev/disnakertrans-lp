"use client"

import { Facebook, Twitter, Linkedin, Instagram, Mail, MapPin, Phone, Mail as MailIcon, MapPin as MapPinIcon, Phone as PhoneIcon } from "lucide-react"
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

export interface FooterServiceItem {
  id: string;
  name: string;
  type: string;
  url: string | null;
  category_id: string | null;
  status: boolean;
  created_at?: string | null;
  updated_at?: string | null;
  categories?: {
    id: string;
    name: string;
  } | null;
}

export default function Footer() {
  const [socialMedia, setSocialMedia] = useState<SocialMediaItem[]>([]);
  const [socialMediaLoading, setSocialMediaLoading] = useState(true);
  const [footerServices, setFooterServices] = useState<FooterServiceItem[]>([]);
  const [footerServicesLoading, setFooterServicesLoading] = useState(true);
  const [footerContacts, setFooterContacts] = useState<FooterContactItem[]>([]);
  const [footerContactsLoading, setFooterContactsLoading] = useState(true);
  const currentYear = new Date().getFullYear()

  interface FooterContactItem {
    id: string;
    type: string;
    title: string;
    url: string | null;
    status: boolean;
    created_at?: string | null;
    updated_at?: string | null;
  }

  useEffect(() => {
    const fetchData = async () => {
      // Fetch social media
      try {
        const socialMediaResponse = await fetch('/api/social-media');
        if (socialMediaResponse.ok) {
          const socialMediaData: SocialMediaItem[] = await socialMediaResponse.json();
          setSocialMedia(socialMediaData);
        } else {
          console.error('Failed to fetch social media:', socialMediaResponse.statusText);
        }
      } catch (error) {
        console.error('Error fetching social media:', error);
      } finally {
        setSocialMediaLoading(false);
      }

      // Fetch footer services
      try {
        const footerServicesResponse = await fetch('/api/footer-services');
        if (footerServicesResponse.ok) {
          const footerServicesData: FooterServiceItem[] = await footerServicesResponse.json();
          setFooterServices(footerServicesData);
        } else {
          console.error('Failed to fetch footer services:', footerServicesResponse.statusText);
        }
      } catch (error) {
        console.error('Error fetching footer services:', error);
      } finally {
        setFooterServicesLoading(false);
      }

      // Fetch footer contacts
      try {
        const footerContactsResponse = await fetch('/api/footer-contacts');
        if (footerContactsResponse.ok) {
          const footerContactsData: FooterContactItem[] = await footerContactsResponse.json();
          setFooterContacts(footerContactsData);
        } else {
          console.error('Failed to fetch footer contacts:', footerContactsResponse.statusText);
        }
      } catch (error) {
        console.error('Error fetching footer contacts:', error);
      } finally {
        setFooterContactsLoading(false);
      }
    };

    fetchData();
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
              {footerServicesLoading ? (
                // Loading placeholders
                <>
                  <li className="h-4 bg-gray-700 rounded animate-pulse w-3/4"></li>
                  <li className="h-4 bg-gray-700 rounded animate-pulse w-1/2"></li>
                  <li className="h-4 bg-gray-700 rounded animate-pulse w-2/3"></li>
                  <li className="h-4 bg-gray-700 rounded animate-pulse w-1/3"></li>
                </>
              ) : footerServices.length > 0 ? (
                footerServices.map((service) => {
                  // Determine the URL based on the service type
                  let linkUrl = '#';

                  if (service.type.toLowerCase() === 'redirect' && service.url) {
                    // For redirect type, use the provided URL
                    linkUrl = service.url;
                  } else if (service.type.toLowerCase() === 'category' && service.categories) {
                    // For category type, link to blog with category filter
                    linkUrl = `/blog?category=${encodeURIComponent(service.categories.name)}`;
                  }

                  return (
                    <li key={service.id}>
                      <a
                        href={linkUrl}
                        className="hover:text-purple-400 transition-colors"
                      >
                        {service.name}
                      </a>
                    </li>
                  );
                })
              ) : (
                // Empty state
                <li>Tidak ada layanan</li>
              )}
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
              {footerContactsLoading ? (
                // Loading placeholders
                <>
                  <div className="flex items-start gap-2">
                    <div className="w-4 h-4 bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-700 rounded animate-pulse w-3/4"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-700 rounded animate-pulse w-1/2"></div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-700 rounded animate-pulse w-2/3"></div>
                  </div>
                </>
              ) : footerContacts.length > 0 ? (
                footerContacts.map((contact) => {
                  // Determine icon based on contact type
                  let iconElement;
                  let displayLinkPrefix = '';
                  switch(contact.type.toLowerCase()) {
                    case 'map':
                    case 'alamat':
                    case 'location':
                      iconElement = <MapPin size={16} />;
                      displayLinkPrefix = '';
                      break;
                    case 'telepon':
                    case 'phone':
                    case 'telp':
                      iconElement = <Phone size={16} />;
                      displayLinkPrefix = 'tel:';
                      break;
                    case 'email':
                    case 'mail':
                      iconElement = <Mail size={16} />;
                      displayLinkPrefix = 'mailto:';
                      break;
                    default:
                      // Use generic icon or return a div
                      iconElement = <div className="w-4 h-4 bg-gray-700 rounded"></div>;
                      displayLinkPrefix = '';
                  }

                  return (
                    <div key={contact.id} className="flex items-center gap-2">
                      {iconElement}
                      <a
                        href={`${displayLinkPrefix}${contact.url || '#'}`}
                        className="hover:text-purple-400 transition-colors"
                      >
                        {contact.title}
                      </a>
                    </div>
                  );
                })
              ) : (
                // Empty state
                <p>Tidak ada informasi kontak</p>
              )}
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
