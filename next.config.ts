import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Add Google image domain here for profile pics to show
      },
    ],
  },
};

export default nextConfig;
