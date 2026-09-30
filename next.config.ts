import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  outputFileTracingIncludes: {
    "/": ["./src/content/home.html"],
  },
  async redirects() {
    return [
      // Retired pages send visitors to the homepage.
      { source: "/fund", destination: "/", permanent: true },
      { source: "/gtm-fund", destination: "/", permanent: true },
      { source: "/acquire", destination: "/", permanent: true },
      { source: "/privacy", destination: "/", permanent: true },
      { source: "/terms", destination: "/", permanent: true },
      { source: "/contact", destination: "/qualify", permanent: false },
    ];
  },
};

export default nextConfig;
