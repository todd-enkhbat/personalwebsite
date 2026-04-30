import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.gr-assets.com"
      },
      {
        protocol: "https",
        hostname: "images-na.ssl-images-amazon.com"
      }
    ]
  }
};

export default nextConfig;
