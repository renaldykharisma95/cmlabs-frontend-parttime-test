import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: String(process.env.NEXT_HOSTNAME),
      },
    ],
  },
};

export default nextConfig;
