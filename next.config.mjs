/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["hebbkx1anhila5yf.public.blob.vercel-storage.com"],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    webpack: (config) => {
        config.optimization.splitChunks = false;
        return config;
    },
};

export default nextConfig;
