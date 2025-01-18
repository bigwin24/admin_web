import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: false, // 임시 리디렉션
      },
    ];
  },
};

export default nextConfig;
