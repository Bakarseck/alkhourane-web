/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["hebbkx1anhila5yf.public.blob.vercel-storage.com"],
    },
    eslint: {
        ignoreDuringBuilds: true, // ✅ Désactive ESLint lors de la compilation
    },
};

export default nextConfig;
