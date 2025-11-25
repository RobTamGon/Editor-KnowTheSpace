// app/layout.tsx
import "./../globals.css"
import { Providers } from "../../providers.jsx"

// Metadata del sitio
export const metadata = {
  title: "KnowTheSpace",
  description: "Game Website",
}

// Vista de la aplicación
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        {/* Proveedores de autenticación y de datos */}
        <Providers>
          {/* Contenido de la aplicación */}
          {children}
        </Providers>
      </body>
    </html>
  )
}
