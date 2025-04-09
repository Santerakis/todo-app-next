/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  eslint: {
    ignoreDuringBuilds: true
  },
  allowedDevOrigins: ['http://localhost:3000', 'http://192.168.0.105:3000']
};

module.exports = nextConfig;
