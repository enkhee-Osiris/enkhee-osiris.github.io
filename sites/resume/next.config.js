const withTM = require("next-transpile-modules")(["kbar", "@enkhee-Osiris/ui"]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  swcMinify: true,
  trailingSlash: true,
};

module.exports = withTM(nextConfig);
