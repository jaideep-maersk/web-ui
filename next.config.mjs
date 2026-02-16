/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  
  // Environment variables
  env: {
    APP_VERSION: process.env.npm_package_version || '0.8.2',
  },

  // Turbopack configuration (Next.js 16+)
  turbopack: {},

  // Webpack configuration for compatibility (fallback for non-Turbopack builds)
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },

  // Enable source maps in production for debugging
  productionBrowserSourceMaps: true,

  // Output configuration
  output: 'standalone',
};

export default nextConfig;
