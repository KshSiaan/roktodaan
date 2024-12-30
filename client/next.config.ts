import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["img.icons8.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*", // This is a proxy pattern to rewrite all '/api' requests
        destination: "http://localhost:5000/:path*", // Forward to your Express backend
      },
    ];
  },
};

export default nextConfig;
