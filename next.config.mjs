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
        // Cache static assets (images, fonts, icons) for 1 year
        source: '/:path*(\\.(jpg|jpeg|png|gif|webp|avif|svg|ico|woff|woff2|ttf|otf))',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache JS/CSS bundles (they have content hashes in filenames)
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
