const withTM = require("next-transpile-modules")(["kbar", "@enkhee-Osiris/ui"]);

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  rewrites: () => {
    return [
      {
        source: "/resume",
        destination: "http://localhost:3001/resume",
      },
      {
        source: "/blogs",
        destination: "http://localhost:3002/blogs",
      },
    ];
  },
  swcMinify: true,
  trailingSlash: true,
};

module.exports = withTM(nextConfig);
