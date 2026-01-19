"use client"

import { Mail, MapPin, Phone, Info, Mail as MailIcon, MapPin as MapPinIcon, Phone as PhoneIcon } from "lucide-react"
import { useState, useEffect } from "react"
import SocialLink from "@/components/social-link"

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
                  const contactType = contact.type.toLowerCase();
                  let iconElement;
                  let displayLinkPrefix = '';
                  if (contactType.includes('map') || contactType.includes('alamat') || contactType.includes('location') || contactType.includes('lokasi')) {
                    iconElement = <MapPin size={18} className="flex-shrink-0" />;
                    displayLinkPrefix = '';
                  } else if (contactType.includes('telepon') || contactType.includes('phone') || contactType.includes('telp')) {
                    iconElement = <Phone size={18} className="flex-shrink-0" />;
                    displayLinkPrefix = 'tel:';
                  } else if (contactType.includes('email') || contactType.includes('mail')) {
                    iconElement = <Mail size={18} className="flex-shrink-0" />;
                    displayLinkPrefix = 'mailto:';
                  } else {
                    iconElement = <Info size={18} className="flex-shrink-0" />;
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
            {/* Map Section */}
            <div className="mt-4">
              <h3 className="font-bold text-white mb-2">Lokasi Kami</h3>
              <div className="w-full h-48 rounded overflow-hidden">
                {footerContactsLoading ? (
                  <div className="w-full h-full bg-gray-700 rounded animate-pulse"></div>
                ) : (
                  <iframe
                    src={
                      footerContacts.find(contact =>
                        contact.type.toLowerCase() === 'maps' && contact.url
                      )?.url ||
                      footerContacts.find(contact =>
                        ['map', 'alamat', 'location'].includes(contact.type.toLowerCase()) && contact.url
                      )?.url ||
                      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.867826842174!2d113.9171556748449!3d-2.200641936837961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2de3add80b2e1bcb%3A0xb300cbbec03fb38b!2sJl.%20Ahmad%20Yani%2C%20Palangkaraya%2C%20Kalimantan%20Tengah!5e0!3m2!1sen!2sid!4v1702567890123!5m2!1sen!2sid"
                    }
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Lokasi Kantor Disnakertrans"
                  ></iframe>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <h3 className="font-bold text-white mb-4">Ikuti Kami</h3>
          <div className="flex gap-4">
            {!socialMediaLoading && socialMedia.length > 0 ? (
              socialMedia.map((social) => (
                <SocialLink
                  key={social.id}
                  url={social.url}
                  name={social.name}
                  icon={social.icon}
                  color={social.color}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-white transition-colors"
                  iconSize={18}
                />
              ))
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
