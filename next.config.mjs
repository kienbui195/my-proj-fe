/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['127.0.0.1', 'admin.kiendev.click'],
    remotePatterns: [],
    loader: "default"
  },
  reactStrictMode: false
};

export default nextConfig;
