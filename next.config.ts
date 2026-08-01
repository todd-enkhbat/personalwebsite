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
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: ["**/node_modules/**", "**/.git/**", "**/.next/**", "**/public/paper-assets/**"]
      };
    }
    return config;
  }
};

export default nextConfig;
