import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Ensure we can use trailing slashes
  trailingSlash: true,
  // Disable server components for static export
  reactStrictMode: true,
};

export default nextConfig;
