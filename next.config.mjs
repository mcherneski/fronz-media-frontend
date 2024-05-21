/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol: 'https',
                hostname: 'informed-captain-64ef5bbe8f.media.strapiapp.com',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '1337',
            }
        ]
    }
};

export default nextConfig;
