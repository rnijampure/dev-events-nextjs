import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  /* config options here */
  experimental: {
    // @ts-ignore or cast
  },
  images: {
    domains: ["via.placeholder.com"],
  },
};

export default nextConfig;
