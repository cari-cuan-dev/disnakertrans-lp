/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storagedisnakertrans.kalteng.go.id',
      },
      {
        protocol: 'https',
        hostname: 'cmskerjaberkah.kalteng.go.id',
      },
      {
        protocol: 'https',
        hostname: 'cmsdisnakertrans.kalteng.go.id',
      },
      {
        protocol: 'https',
        hostname: '*.r2.cloudflarestorage.com',
      },
    ],
  },
  async headers() {
    return [
      {
        // Cache Next.js JS/CSS bundles — safe with immutable because filenames have content hashes
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  serverExternalPackages: [
    '@prisma/client',
    '@prisma/adapter-pg',
    'pg',
    'bcrypt',
  ],
}

export default nextConfig
