"use client"

import { useState, useEffect } from "react"
import { Menu, X, Search, ChevronDown, User } from "lucide-react"
import IconoirLoader from "./iconoir-loader"
import SocialLink from "./social-link"
import SearchModal from "./search-modal"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { getAccessToken, isAuthenticated } from "@/lib/auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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

export interface MenuHeader {
  id: string;
  name: string;
  type: string;
  url: string | null;
  status: string;  // Changed from boolean to string
  sort: number;
  created_at?: string | null;
  updated_at?: string | null;
  category_id: string | null;
  categories: {
    id: string;
    name: string;
  } | null;
  menu_sub_headers: MenuSubHeader[];
}

export interface MenuSubHeader {
  id: string;
  menu_header_id: string;
  name: string;
  type: string;
  url: string | null;
  status: string;  // Changed from boolean to string
  sort: number;
  created_at?: string | null;
  updated_at?: string | null;
  category_id: string | null;
  categories: {
    id: string;
    name: string;
  } | null;
}

interface UserInfo {
  id: string;
  email: string;
  name?: string;  // Optional name field
  [key: string]: any;  // Allow other fields
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({})
  const [socialMedia, setSocialMedia] = useState<SocialMediaItem[]>([]);
  const [socialMediaLoading, setSocialMediaLoading] = useState(true);
  const [menuHeaders, setMenuHeaders] = useState<MenuHeader[]>([]);
  const [menuHeadersLoading, setMenuHeadersLoading] = useState(true);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [userLoading, setUserLoading] = useState(true);
  const searchParams = useSearchParams()

  // Function to determine if menu item should be displayed based on status and login state
  const shouldDisplayHeader = (status: string, currentUser: UserInfo | null) => {
    switch (status) {
      case 'Show':
        return true;
      case 'Show Login':
        return !!currentUser; // Only show when user is logged in
      case 'Show Logout':
        return !currentUser; // Only show when user is not logged in
      case 'Hide':
        return false;
      default:
        return false;
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      // Check if user is authenticated first
      const authenticated = await isAuthenticated();
      if (authenticated) {
        const token = getAccessToken();
        if (token) {
          try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
              },
            });

            if (response.ok) {
              const userData: UserInfo = await response.json();
              setUser(userData);
            } else {
              console.error('Failed to fetch user data:', response.status);
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        }
      }
      setUserLoading(false);
    };

    const fetchData = async () => {
      // Fetch social media
      try {
        const socialMediaResponse = await fetch('/api/social-media');
        console.log(socialMediaResponse);
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

      // Fetch menu headers
      try {
        const menuHeadersResponse = await fetch('/api/menu-headers');
        if (menuHeadersResponse.ok) {
          const menuHeadersData: MenuHeader[] = await menuHeadersResponse.json();
          setMenuHeaders(menuHeadersData);
        } else {
          console.error('Failed to fetch menu headers:', menuHeadersResponse.statusText);
        }
      } catch (error) {
        console.error('Error fetching menu headers:', error);
      } finally {
        setMenuHeadersLoading(false);
      }
    };

    fetchData();
    fetchUserData();  // Fetch user data on mount
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Clear all dropdowns when mobile menu is closed
  useEffect(() => {
    if (!isOpen) {
      setOpenDropdowns({});
    }
  }, [isOpen])




  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10">
                <img src="/logo.svg" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <span className="hidden sm:inline font-bold text-gray-900">Disnakertrans Kalteng</span>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              {!menuHeadersLoading ? (
                <>
                  {menuHeaders.map((header) => {
                    if (!shouldDisplayHeader(header.status, user)) return null;

                    // Check if this menu item has sub-headers
                    if (header.menu_sub_headers && header.menu_sub_headers.length > 0) {
                      return (
                        <div key={header.id} className="relative group">
                          <button className="text-gray-700 hover:text-purple-600 transition-colors text-sm font-medium flex items-center gap-1">
                            {header.name}
                            <ChevronDown size={16} className="group-hover:rotate-180 transition-transform" />
                          </button>
                          <div className="absolute left-0 mt-0 w-48 bg-white border border-purple-100 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                            {header.menu_sub_headers.map((subHeader) => {
                              // Check if sub-header should be displayed
                              if (!shouldDisplayHeader(subHeader.status, user)) return null;

                              // If type is 'category' and category exists, link to /blog?category=NAME
                              let subLinkUrl = subHeader.url || '#';
                              if (subHeader.type.toLowerCase() === 'category' && subHeader.categories) {
                                // If type is 'category' and has category info, link to /blog?category=CATEGORY_NAME
                                subLinkUrl = `/blog?category=${encodeURIComponent(subHeader.categories.name)}`;
                              }

                              return (
                                <Link
                                  key={subHeader.id}
                                  href={subLinkUrl}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                                >
                                  {subHeader.name}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      );
                    } else {
                      // Menu header without sub-headers
                      // If type is 'category' and category exists, link to /blog?category=NAME
                      let linkUrl = header.url || '#';
                      if (header.type.toLowerCase() === 'category' && header.categories) {
                        linkUrl = `/blog?category=${encodeURIComponent(header.categories.name)}`;
                      }

                      return (
                        <Link
                          key={header.id}
                          href={linkUrl}
                          className="text-gray-700 hover:text-purple-600 transition-colors text-sm font-medium"
                        >
                          {header.name}
                        </Link>
                      );
                    }
                  })}
                  <Link
                    href="/gallery"
                    className="text-gray-700 hover:text-purple-600 transition-colors text-sm font-medium"
                  >
                    Galeri
                  </Link>
                </>
              ) : (
                // Loading placeholders
                <>
                  <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
                </>
              )}
            </div>

            {/* Search, Social Media and Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              <div className="hidden lg:flex items-center gap-2">
                {!socialMediaLoading && socialMedia.length > 0 ? (
                  socialMedia.map((social) => (
                    <SocialLink
                      key={social.id}
                      url={social.url}
                      name={social.name}
                      icon={social.icon}
                      color={social.color}
                      className="text-gray-700 p-2 hover:bg-purple-50 rounded-lg transition-colors"
                      iconSize={18}
                    />
                  ))
                ) : (
                  // Show loading placeholders only
                  <div className="flex gap-2">
                    <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                )}
              </div>

              {/* <button
                onClick={() => setSearchOpen(true)}
                className="hidden sm:flex p-2 hover:bg-purple-50 rounded-lg transition-colors items-center gap-2 text-gray-600 text-xs font-medium"
                title="Cari berita (Ctrl+K)"
              >
                <Search size={20} className="text-gray-700" />
                <span className="hidden lg:inline">Ctrl+K</span>
              </button> */}
              <button
                onClick={() => setSearchOpen(true)}
                className="sm:hidden p-2 hover:bg-purple-50 rounded-lg transition-colors"
              >
                <Search size={20} className="text-gray-700" />
              </button>

              {userLoading ? (
                <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
              ) : user ? (
                // User is logged in - show user profile and search shortcut
                <div className="flex items-center gap-3">
                  {/* Search shortcut for logged-in users */}
                  <Link
                    href="/kerja-berkah#search-section"
                    onClick={(e) => {
                      // If we're already on the kerja-berkah page, prevent default and scroll
                      if (window.location.pathname === '/kerja-berkah') {
                        e.preventDefault();

                        // Small delay to ensure page is loaded
                        setTimeout(() => {
                          const element = document.getElementById('search-section');
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                            // Also update the URL hash
                            window.location.hash = 'search-section';
                          }
                        }, 100);
                      }
                      // If navigating from another page, let the URL hash handle scrolling after navigation
                    }}
                    className="hidden md:flex items-center gap-1 px-3 py-2 text-sm font-medium text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors"
                  >
                    <Search size={18} className="text-purple-600" />
                    <span className="hidden lg:inline">Cari</span>
                  </Link>

                  {user.type === 'Admin' ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <div className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer hover:text-purple-600 group">
                          <User size={18} className="text-purple-600" />
                          <span className="max-w-[120px] truncate" title={user.name || user.email}>
                            {user.name || user.email}
                          </span>
                          <ChevronDown size={14} className="text-gray-400 group-data-[state=open]:rotate-180 transition-transform" />
                        </div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56 mt-2">
                        <DropdownMenuLabel>Panel Administrator</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <a
                            href={`${process.env.NEXT_PUBLIC_DISNAKERTRANS_LOGIN_URL}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full cursor-pointer"
                          >
                            Masuk ke CMS Disnakertrans
                          </a>
                        </DropdownMenuItem>
                        {/* <DropdownMenuItem asChild>
                          <a
                            href={`${process.env.NEXT_PUBLIC_KERJABERKAH_LOGIN_URL}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full cursor-pointer"
                          >
                            Masuk ke CMS Kerja Berkah
                          </a>
                        </DropdownMenuItem> */}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <div
                      className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-700 cursor-pointer hover:text-purple-600"
                      onClick={() => {
                        window.location.href = '/profile';
                      }}
                    >
                      <User size={18} className="text-purple-600" />
                      <span className="max-w-[120px] truncate" title={user.name || user.email}>
                        {user.name || user.email}
                      </span>
                    </div>
                  )}
                  <button
                    onClick={() => {
                      localStorage.removeItem('access_token');
                      window.location.href = '/login';
                    }}
                    className="hidden md:block px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
                  >
                    Logout
                  </button>
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 hover:bg-purple-50 rounded-lg transition-colors"
                  >
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                  </button>
                </div>
              ) : (
                // User is not logged in - show login link
                <div className="flex items-center gap-2">
                  <Link
                    href="/login"
                    className="hidden md:block px-4 py-2 text-sm font-medium text-purple-600 hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors"
                  >
                    Login
                  </Link>
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="md:hidden p-2 hover:bg-purple-50 rounded-lg transition-colors"
                  >
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <div className="md:hidden pb-4 border-t border-purple-100">
              {!menuHeadersLoading ? (
                <>
                  {menuHeaders.map((header) => {
                    if (!shouldDisplayHeader(header.status, user)) return null;

                    // Check if this menu item has sub-headers
                    if (header.menu_sub_headers && header.menu_sub_headers.length > 0) {
                      const isDropdownOpen = openDropdowns[header.id] || false;
                      const toggleDropdown = () => {
                        setOpenDropdowns(prev => ({
                          ...prev,
                          [header.id]: !prev[header.id]
                        }));
                      };

                      return (
                        <div key={header.id}>
                          <button
                            onClick={toggleDropdown}
                            className="w-full text-left py-2 text-gray-700 hover:text-purple-600 transition-colors flex items-center justify-between"
                          >
                            {header.name}
                            <ChevronDown size={16} className={`transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} />
                          </button>
                          {isDropdownOpen && (
                            <div className="bg-purple-50 rounded-lg mt-2 py-2">
                              {header.menu_sub_headers.map((subHeader) => {
                                // Check if sub-header should be displayed
                                if (!shouldDisplayHeader(subHeader.status, user)) return null;

                                // If type is 'category' and category exists, link to /blog?category=NAME
                                let subLinkUrl = subHeader.url || '#';
                                if (subHeader.type.toLowerCase() === 'category' && subHeader.categories) {
                                  // If type is 'category' and has category info, link to /blog?category=CATEGORY_NAME
                                  subLinkUrl = `/blog?category=${encodeURIComponent(subHeader.categories.name)}`;
                                }

                                return (
                                  <Link
                                    key={subHeader.id}
                                    href={subLinkUrl}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:text-purple-600 transition-colors"
                                  >
                                    {subHeader.name}
                                  </Link>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    } else {
                      // Menu header without sub-headers
                      // If type is 'category' and category exists, link to /blog?category=NAME
                      let linkUrl = header.url || '#';
                      if (header.type.toLowerCase() === 'category' && header.categories) {
                        linkUrl = `/blog?category=${encodeURIComponent(header.categories.name)}`;
                      }

                      return (
                        <Link
                          key={header.id}
                          href={linkUrl}
                          className="block py-2 text-gray-700 hover:text-purple-600 transition-colors"
                        >
                          {header.name}
                        </Link>
                      );
                    }
                  })}
                  <Link
                    href="/gallery"
                    className="block py-2 text-gray-700 hover:text-purple-600 transition-colors"
                  >
                    Galeri
                  </Link>
                </>
              ) : (
                // Loading placeholders
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6 animate-pulse"></div>
                </div>
              )}

              {user ? (
                // User is logged in - show user profile, search shortcut and logout
                <div className="pt-4 border-t border-purple-100">
                  <Link
                    href="/kerja-berkah#search-section"
                    onClick={(e) => {
                      // If we're already on the kerja-berkah page, prevent default and scroll
                      if (window.location.pathname === '/kerja-berkah') {
                        e.preventDefault();
                        // Add the search-section to URL hash
                        window.location.hash = 'search-section';

                        // Small delay to ensure page is loaded
                        setTimeout(() => {
                          const element = document.getElementById('search-section');
                          if (element) {
                            element.scrollIntoView({ behavior: 'smooth' });
                          }
                        }, 100);
                      }
                    }}
                    className="block py-2 text-gray-700 hover:text-purple-600 transition-colors flex items-center gap-2"
                  >
                    <Search size={18} className="text-purple-600" />
                    <span>Temukan Apa yang Anda Cari</span>
                  </Link>
                  <div className="py-2 text-gray-700 font-medium">
                    <div className="flex items-center gap-2 mb-2">
                      <User size={18} className="text-purple-600" />
                      <span>{user.name || user.email}</span>
                      {user.type === 'admin' && (
                        <span className="text-[10px] bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-full">admin</span>
                      )}
                    </div>

                    {user.type === 'admin' ? (
                      <div className="flex flex-col gap-1 pl-6 border-l-2 border-purple-100 mt-2 mb-4">
                        <a
                          href={`${process.env.NEXT_PUBLIC_DISNAKERTRANS_LOGIN_URL}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2 text-sm text-gray-600 hover:text-purple-600 transition-colors"
                        >
                          Masuk ke CMS Disnakertrans
                        </a>
                        {/* <a
                          href={`${process.env.NEXT_PUBLIC_KERJABERKAH_LOGIN_URL}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2 text-sm text-gray-600 hover:text-purple-600 transition-colors"
                        >
                          Masuk ke CMS Kerja Berkah
                        </a> */}
                      </div>
                    ) : (
                      <Link
                        href="/profile"
                        className="block py-2 text-sm text-gray-600 hover:text-purple-600 transition-colors pl-6"
                      >
                        Lihat Profil
                      </Link>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      localStorage.removeItem('access_token');
                      window.location.href = '/login';
                    }}
                    className="block w-full py-2 text-left text-gray-700 hover:text-purple-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                // User is not logged in - show login link
                <Link href="/login" className="block py-2 text-gray-700 hover:text-purple-600 transition-colors">
                  Login
                </Link>
              )}

              <div className="flex items-center gap-2 mt-4 pt-4 border-t border-purple-100">
                {!socialMediaLoading && socialMedia.length > 0 ? (
                  socialMedia.map((social) => (
                    <SocialLink
                      key={social.id}
                      url={social.url}
                      name={social.name}
                      icon={social.icon}
                      color={social.color}
                      className="text-gray-700 p-2 hover:bg-purple-50 rounded-lg transition-colors"
                      iconSize={18}
                    />
                  ))
                ) : (
                  // Show loading placeholders only
                  <div className="flex gap-2">
                    <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div >
      </nav >

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
