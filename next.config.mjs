/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // Asegúrate de que la estructura app/ esté habilitada
  },
  images: {
    domains: ['www.sentieriselvaggi.it', 'e1.pxfuel.com', 'steamuserimages-a.akamaihd.net'],
  },
};

export default nextConfig;
