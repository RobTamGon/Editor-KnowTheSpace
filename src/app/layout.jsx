// app/layout.tsx
import "./globals.css"
import { Providers } from "../providers.jsx"

export const metadata = {
  title: "KnowTheSpace",
  description: "Game Website",
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
