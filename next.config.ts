import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/cmlabs-frontend-parttime-test",
  trailingSlash: true,
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.themealdb.com",
      },
    ],
  },
};

export default nextConfig;
