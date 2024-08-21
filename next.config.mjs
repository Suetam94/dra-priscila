/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'clinprosaude.com.br'
      },
      {
        hostname: '4cpatiobatel.crmall.com'
      },
      {
        hostname: 'firebasestorage.googleapis.com'
      }
    ]
  }
};

export default nextConfig;
