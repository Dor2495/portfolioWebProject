/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'your-production-api-domain.com'],
    unoptimized: true, // Disable image optimization for static export
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3001',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'your-production-api-domain.com',
        pathname: '/**',
      },
    ],
  },
  output: 'export',  // Static site generation for easier deployment
  distDir: 'out',
  trailingSlash: true, // Add trailing slashes to URLs
  
  // Environment variable setup
  env: {
    // Use environment variable with fallback for local development
    API_URL: process.env.API_URL || 'http://localhost:3001',
  },
}

module.exports = nextConfig 