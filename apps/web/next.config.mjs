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
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self' data:; connect-src 'self' https://soroban-testnet.stellar.org https://horizon-testnet.stellar.org https://warrantx-api.onrender.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'" },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
        ],
      },
    ];
  },
};

export default nextConfig;
