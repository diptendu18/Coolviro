/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: false,
  images: {
    formats: ['image/avif', 'image/webp']
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' }
        ]
      },
      {
        // HTML page routes only (never /_next/static assets, which are
        // already content-hashed and safe to cache immutably/forever).
        // Forces browsers/CDNs to revalidate the HTML on every visit
        // instead of serving a stale copy that could reference JS/CSS
        // chunk hashes from a previous deploy that no longer exist.
        source: '/((?!_next/).*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' }]
      }
    ];
  }
};

module.exports = nextConfig;
