import type { NextConfig } from "next";

// CSP for main site (all routes except /studio)
// Phase 2: Report-only mode for testing. Switch to Content-Security-Policy after verification.
const mainSiteCSP = [
  "default-src 'self'",
  "script-src 'self' https://www.googletagmanager.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' https://cdn.sanity.io data:",
  "font-src 'self'",
  "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com",
  "frame-src 'none'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

// CSP for Sanity Studio (more permissive for SPA functionality)
const studioCSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' https://cdn.sanity.io data: blob:",
  "font-src 'self' data:",
  "connect-src 'self' https://*.api.sanity.io https://*.apicdn.sanity.io wss://*.api.sanity.io https://www.google-analytics.com https://region1.google-analytics.com",
  "frame-src 'self'",
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

const securityHeaders = [
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
    ],
  },
  async headers() {
    return [
      // Studio route - permissive CSP for SPA functionality
      {
        source: '/studio/:path*',
        headers: [
          ...securityHeaders.filter(h => h.key !== 'X-Frame-Options'),
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            // Report-only mode for Phase 2 testing
            key: 'Content-Security-Policy-Report-Only',
            value: studioCSP,
          },
        ],
      },
      // Main site - strict CSP
      {
        source: '/((?!studio).*)',
        headers: [
          ...securityHeaders,
          {
            // Report-only mode for Phase 2 testing
            key: 'Content-Security-Policy-Report-Only',
            value: mainSiteCSP,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
