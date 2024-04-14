/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/root',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
