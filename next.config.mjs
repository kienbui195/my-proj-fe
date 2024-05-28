/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['127.0.0.1', 'admin.kiendev.click'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'admin.kiendev.click'
      }
    ],
    loader: "default"
  },
  reactStrictMode: false
};

export default nextConfig;
