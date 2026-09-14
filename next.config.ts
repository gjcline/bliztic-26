import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/fund", destination: "/gtm-fund", permanent: false },
      { source: "/contact", destination: "/qualify", permanent: false },
    ];
  },
};

export default nextConfig;
