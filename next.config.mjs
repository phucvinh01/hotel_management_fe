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
<<<<<<< HEAD


=======
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://127.0.0.1:8000/api/:path*',
            },
        ]
    },
    images: {
        domains: ['127.0.0.1'],
    },
>>>>>>> VNDT082
};



export default nextConfig;
