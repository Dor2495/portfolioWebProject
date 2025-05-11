/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost'],
    unoptimized: true, // Disable image optimization for static export
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/**',
      },
    ],
  },
  output: 'export',  // Static site generation for easier deployment
  distDir: 'out',
  trailingSlash: true, // Add trailing slashes to URLs
}

module.exports = nextConfig 