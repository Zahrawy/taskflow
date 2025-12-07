/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable experimental features if needed
    experimental: {
        // serverActions: true,
    },
    // Environment variables
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://taskflow-1-g1ao.onrender.com/api',
    },
};

module.exports = nextConfig;
