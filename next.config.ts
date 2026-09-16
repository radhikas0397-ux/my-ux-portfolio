import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [100, 75],
  },
  // Allow phone/tablet on same Wi‑Fi to load dev assets (HMR, _next/*)
  allowedDevOrigins: ["192.168.*.*", "10.*.*.*"],
};

export default nextConfig;
