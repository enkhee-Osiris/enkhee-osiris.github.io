const withTM = require("next-transpile-modules")(["@enkhee-Osiris/ui"]);

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
  swcMinify: true,
};

module.exports = withTM(nextConfig);
