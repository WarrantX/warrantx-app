/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@warrantx/ui',
    '@warrantx/stellar',
    '@warrantx/validation',
    '@warrantx/database',
    '@warrantx/sdk',
  ],
  reactStrictMode: true,
};

export default nextConfig;
