/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
  basePath: "/blogs",
};

module.exports = nextConfig;
