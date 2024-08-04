/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'clinprosaude.com.br'
      },
      {
        hostname: '4cpatiobatel.crmall.com'
      }
    ]
  }
};

export default nextConfig;
