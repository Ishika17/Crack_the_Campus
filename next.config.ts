import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // This app is nested in the workspace; do not infer a parent lockfile.
  turbopack: {
    root: __dirname,
  },
  // Removes the `x-powered-by` header — a few free bytes on every response.
  poweredByHeader: false,
  // Ready for real artwork: any <Image> added later is served as AVIF/WebP
  // with width-based srcsets instead of the original upload.
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
