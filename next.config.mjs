/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8000',
            },
            {
                protocol: 'https',
                hostname: 'github.com',
            },
        ],
    },
    async redirects() {
        return [
            {
                source: '/',
                destination: '/app',
                permanent: true,
            },
        ];
    },
};



export default nextConfig;
