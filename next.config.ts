import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath:
    process.env.NODE_ENV === "production" ? process.env.NEXT_BASE_PATH : "",
  trailingSlash: true,
  output: "standalone",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: String(process.env.NEXT_HOSTNAME)
      },
    ],
  },
};

export default nextConfig;
