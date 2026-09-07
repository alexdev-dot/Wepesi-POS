const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.mafrservices.com',
      },
      {
        protocol: 'https',
        hostname: 'cfn.quickmart.co.ke',
      },
      {
        protocol: 'https',
        hostname: 'd16zmt6hgq1jhj.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: 'hthjpanikaxhrhxtoszz.supabase.co',
        pathname: '/storage/v1/object/public/product-images/**',
      },
    ],
  },
  turbopack: {},
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
  allowedDevOrigins: ['10.1.1.3'],
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
}

export default nextConfig
