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
  serverExternalPackages: [
    '@prisma/client',
    '@prisma/adapter-pg',
    'pg',
    'bcrypt',
  ],
}

export default nextConfig
