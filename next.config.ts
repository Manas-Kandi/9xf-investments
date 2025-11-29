import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  productionBrowserSourceMaps: true,
  experimental: {
    instrumentationHook: true,
  },
};

export default nextConfig;
