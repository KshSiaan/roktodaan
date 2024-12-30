import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["img.icons8.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*", // This is a proxy pattern to rewrite all '/api' requests
        destination: "https://roktodaan.onrender.com/:path*", // Forward to your Express backend
      },
    ];
  },
};

export default nextConfig;
