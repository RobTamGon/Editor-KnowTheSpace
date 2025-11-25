"use client"

import { SessionProvider } from "next-auth/react";

// Proveedor de autenticación y de datos
export function Providers({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
