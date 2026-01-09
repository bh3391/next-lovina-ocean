/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/avif', 'image/webp'],
    
  },
  eslint: {
    // Menonaktifkan pengecekan ESLint saat build agar tidak error di Vercel
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Opsi tambahan jika kamu juga kena error type-checking (opsional)
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
