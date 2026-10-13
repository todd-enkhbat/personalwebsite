import type { NextConfig } from "next";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

const nextConfig = (phase: string): NextConfig => ({
  // Keep live development chunks separate from production builds.
  // Additional previews can choose their own development output directory.
  distDir: phase === PHASE_DEVELOPMENT_SERVER
    ? process.env.NEXT_DEV_DIST_DIR || ".next-dev"
    : ".next",
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
        ignored: ["**/node_modules/**", "**/.git/**", "**/.next/**", "**/.next-dev*/**", "**/public/paper-assets/**"]
      };
    }
    return config;
  }
});

export default nextConfig;
