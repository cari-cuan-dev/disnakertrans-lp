import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import KerjaBerkahCarousel from "@/components/kerja-berkah-carousel"
import KerjaBerkahStats from "@/components/kerja-berkah-stats"
import KerjaBerkahSearch from "@/components/kerja-berkah-search"
import ProtectedSearchSection from "@/components/protected-search-section"
import UnauthenticatedOnly from "@/components/unauthenticated-only"
import ScrollToHash from "@/components/scroll-to-hash"
import { ArrowRight, CheckCircle, Users, Briefcase, Heart, MapPin, Phone, Mail, HelpCircle } from "lucide-react"
import * as IconoirIcons from "iconoir-react"
import Link from "next/link"

import { kerjaBerkahPrisma } from "@/lib/kerjaberkah-prisma"
import { getUrlPreSign } from "@/lib/utils"

interface AboutDetail {
  icon: string;
  icon_color: string;
  title: string;
  description: string;
}

function getIcon(name: string | null) {
  if (!name) return IconoirIcons.QuestionMark

  // Convert kebab-case or snake_case to PascalCase for Iconoir icons
  // e.g., 'check-circle' -> 'CheckCircle'
  const pascalName = name.split(/[-_]/).map(part => part.charAt(0).toUpperCase() + part.slice(1)).join('')

  // Try to find the icon in iconoir-react
  const Icon = (IconoirIcons as any)[pascalName]
  if (Icon) return Icon

  // Fallback to a default icon
  return IconoirIcons.CheckCircle
}

export default async function KerjaBerkahPage() {
  const headline = await kerjaBerkahPrisma.headlines.findFirst({
    where: { status: true },
    orderBy: { id: 'desc' }
  })

  const introduction = await kerjaBerkahPrisma.introductions.findFirst({
    where: { status: true },
    orderBy: { id: 'desc' }
  })

  const slides = await kerjaBerkahPrisma.slides.findMany({
    where: { status: true },
    orderBy: { sort: 'asc' }
  })

  const benefits = await kerjaBerkahPrisma.benefits.findMany({
    where: { status: true },
    orderBy: { sort: 'asc' }
  })

  const joinSteps = await kerjaBerkahPrisma.join_steps.findMany({
    where: { status: true },
    orderBy: { sort: 'asc' }
  })

  // Resolve images using presigned URLs
  const [headlineImageUrl, introductionImageUrl, resolvedSlides] = await Promise.all([
    getUrlPreSign(headline?.image || ""),
    getUrlPreSign(introduction?.image || ""),
    Promise.all((slides || []).map(async (s) => ({
      ...s,
      image: await getUrlPreSign(s.image)
    })))
  ])

  const resolveImage = (path: string | null, fallback: string, resolvedUrl?: string) => {
    if (resolvedUrl && resolvedUrl.startsWith('http')) return resolvedUrl
    if (!path) return fallback
    if (path.startsWith('http') || path.startsWith('/')) return path
    return fallback
  }

  return (
    <>
      <Navigation />
      <ScrollToHash />
      <main className="min-h-screen bg-white">
        {/* Search Features Section - Only show if user is authenticated */}
        <ProtectedSearchSection />

        {/* Hero Section */}
        {headline && (
          <section className="relative bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 text-white py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h1 className="text-5xl font-bold mb-6 text-balance">{headline.title}</h1>
                  <p className="text-xl text-purple-100 mb-8">
                    {headline.description}
                  </p>
                  <UnauthenticatedOnly>
                    <Link href="/kerja-berkah/daftar" className="inline-block">
                      <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors flex items-center gap-2">
                        Daftar Sekarang <ArrowRight size={20} />
                      </button>
                    </Link>
                  </UnauthenticatedOnly>
                </div>
                {headline.image && (
                  <div className="hidden md:block">
                    <img
                      src={resolveImage(headline.image, "/kerja-berkah-community-work-program.jpg", headlineImageUrl)}
                      alt={headline.title}
                      className="w-full rounded-lg shadow-2xl"
                    />
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Carousel Section */}
        <section className="py-8 px-4 bg-gray-50">
          <div className="max-w-6xl mx-auto">
            <KerjaBerkahCarousel slides={resolvedSlides.map(s => ({ ...s, id: Number(s.id) })) as any} />
          </div>
        </section>

        {/* Benefits Section */}
        {benefits.length > 0 && (
          <section className="py-16 px-4 bg-gray-50">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Manfaat Program</h2>
              <div className="grid md:grid-cols-4 gap-8">
                {benefits.map((benefit) => {
                  const Icon = getIcon(benefit.icon);
                  return (
                    <div key={benefit.id.toString()} className="bg-white p-8 rounded-lg shadow-md border-l-4" style={{ borderColor: benefit.border_color || '#9333ea' }}>
                      <Icon className="mb-4" size={32} style={{ color: benefit.border_color || '#9333ea' }} />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        )}

        {/* Statistics Section */}
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <KerjaBerkahStats />
          </div>
        </section>

        {/* Program Details */}
        {introduction && (
          <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Tentang Program Kerja Berkah</h2>
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <img
                    src={resolveImage(introduction.image || null, "/community-service-work.jpg", introductionImageUrl)}
                    alt="Program Details"
                    className="w-full rounded-lg shadow-lg"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">{introduction.title}</h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {introduction.description}
                  </p>
                  <ul className="space-y-4">
                    {(introduction.details as unknown as AboutDetail[] || []).map((about, index) => {
                      const Icon = getIcon(about.icon);
                      return (
                        <li key={index} className="flex items-start gap-3">
                          <Icon style={{ color: about.icon_color || '#9333ea' }} className="flex-shrink-0 mt-1" size={20} />
                          <div>
                            <h4 className="font-semibold text-gray-900">{about.title}</h4>
                            <p className="text-gray-600 text-sm">{about.description}</p>
                          </div>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}


        {/* How to Apply */}
        {joinSteps.length > 0 && (
          <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Cara Mengikuti Program</h2>
              <div className="flex flex-wrap justify-center gap-x-10 gap-y-16">
                {joinSteps.map((step, index) => (
                  <div key={step.id.toString()} className="relative flex flex-col items-center text-center w-full sm:w-64">
                    <div className="text-white min-w-[48px] h-12 px-4 rounded-full flex items-center justify-center font-bold mb-4 text-lg mx-auto" style={{ backgroundColor: step.bg_color || '#9333ea' }}>
                      {step.step_number}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                    {index < joinSteps.length - 1 && (index + 1) % 4 !== 0 && (
                      <div className="hidden lg:block absolute -right-8 top-6 text-2xl" style={{ color: step.bg_color || '#9333ea' }}>→</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        {/* <UnauthenticatedOnly>
          <section className="py-16 px-4 bg-purple-50">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Siap Mengubah Hidup Anda?</h2>
              <p className="text-xl text-gray-600 mb-8">
                Bergabunglah dengan ribuan orang yang telah merasakan manfaat dari Program Kerja Berkah.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/kerja-berkah/daftar"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
                >
                  Daftar Program <ArrowRight size={20} />
                </Link>
                <Link
                  href="/"
                  className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-3 rounded-lg font-semibold transition-all"
                >
                  Kembali ke Beranda
                </Link>
              </div>
            </div>
          </section>
        </UnauthenticatedOnly> */}

      </main>
      <Footer />
    </>
  )
}
