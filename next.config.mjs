/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true, // Asegúrate de que la estructura app/ esté habilitada
  },
  images: {
    domains: ['www.sentieriselvaggi.it'], // Añade los dominios permitidos para imágenes externas
  },
};

export default nextConfig;
