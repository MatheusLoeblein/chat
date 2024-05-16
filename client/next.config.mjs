/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        BACKEND: 'http://localhost:7454',
        STATIC: 'http://localhost:7454/static'
    }
};

export default nextConfig;
