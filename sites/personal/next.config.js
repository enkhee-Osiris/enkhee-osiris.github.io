/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  rewrites: () => {
    return [
      {
        source: "/curriculum_vitae",
        destination: "http://localhost:3001",
      },
      {
        source: "/blogs",
        destination: "http://localhost:3002",
      },
    ];
  },
};

module.exports = nextConfig;
