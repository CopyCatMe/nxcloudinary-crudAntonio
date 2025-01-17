/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
      },
    ],
  },
  experimental: {
    serverActions: {
      // By default, the maximum size of the request body sent to a Server Action is 1MB
      bodySizeLimit: '10mb',
    },
  },
}

export default nextConfig;
