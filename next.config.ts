import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // This is the new recommended way to silence the multiple lockfiles warning
  outputFileTracingRoot: process.cwd(),
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
