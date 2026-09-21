import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  outputFileTracingIncludes: {
    "/": ["./src/content/home.html"],
  },
  async redirects() {
    return [
      { source: "/fund", destination: "/gtm-fund", permanent: false },
      { source: "/contact", destination: "/qualify", permanent: false },
    ];
  },
};

export default nextConfig;
