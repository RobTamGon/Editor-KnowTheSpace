/** @type {import('next').NextConfig} */
// Configuración de Next.js
const nextConfig = {
  devIndicators: false,
  // Configuración de entorno
  env: {
    // Clave secreta del JWT
    JWT_SECRET: process.env.JWT_SECRET,
  },
};

export default nextConfig;
