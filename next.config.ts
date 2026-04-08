import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath:
    process.env.NODE_ENV === "production" ? process.env.NEXT_BASE_PATH : "",
  trailingSlash: true,
  output: process.env.NEXT_OUTPUT as "standalone" | "export" | undefined,
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
