"use client"
import HeroCarousel from "@/components/hero-carousel"
import NewsSection from "@/components/news-section"
import StatsSection from "@/components/stats-section"
import VisitorInfoSection from "@/components/visitor-info-section"
import DocumentationSection from "@/components/documentation-section"
import BlessedWorkspaceSection from "@/components/blessed-workspace-section"
import QuickAccessSection from "@/components/quick-access-section"
import InformationSection from "@/components/information-section"
import Footer from "@/components/footer"
import Navigation from "@/components/navigation"

export default function Home() {
  return (
    <main className="w-full min-h-screen">
      <Navigation />
      <HeroCarousel />
      <NewsSection />
      <StatsSection />
      <VisitorInfoSection />
      <DocumentationSection />
      <BlessedWorkspaceSection />
      <QuickAccessSection />
      <InformationSection />
      <Footer />
    </main>
  )
}
