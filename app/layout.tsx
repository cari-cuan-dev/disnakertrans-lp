import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ScrollToTopProvider } from "@/components/scroll-to-top-provider"
import AnalyticsTracker from "@/components/analytics-tracker"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: "Disnakertrans Kalteng - Dinas Ketenagakerjaan dan Perindustrian",
  description:
    "Website resmi Dinas Ketenagakerjaan dan Perindustrian Kalimantan Tengah. Akses informasi lowongan kerja, sertifikasi, dan program kerja berkah.",
  keywords: ["Disnakertrans", "Ketenagakerjaan", "Kalimantan Tengah", "Kerja Berkah", "Lowongan Kerja"],
  icons: {
    icon: [
      "/logo.avif",
      "/logo.svg",
    ],
    apple: "/logo.avif",
  },
  generator: 'v0.app'
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id">
      <body className={`font-sans antialiased`}>
        <ScrollToTopProvider>{children}</ScrollToTopProvider>
        <AnalyticsTracker />
        <Analytics />
      </body>
    </html>
  )
}
