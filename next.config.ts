import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow all external hosts or specify specific hostnames
      },
    ],
    dangerouslyAllowSVG: true, // Enable support for SVG images
  },
};

export default nextConfig;
