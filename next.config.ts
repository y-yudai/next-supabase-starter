import type { NextConfig } from 'next'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: supabaseUrl.includes('127.0.0.1')
      ? ['127.0.0.1', 'localhost']
      : [new URL(supabaseUrl).hostname],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.jp',
      },
    ],
  },
}

export default nextConfig
