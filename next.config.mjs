/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "picsum.photos",
      },
    ],
    unoptimized: true,
  },
}

export default nextConfig;
