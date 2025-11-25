// /middleware.js
import { NextResponse } from "next/server";

// Middleware para proteger las rutas que empiezan por /dashboard
export function middleware(req) {
  const url = req.nextUrl.clone();

  
  if (url.pathname === "/") {
    return NextResponse.redirect(new URL("/es", req.url));
  }

  // Proteger rutas que empiezan por /dashboard
  if (url.pathname.startsWith("/login")) {
    // Obtiene el token del cookie local_session
    const token = req.cookies.get("local_session")?.value; 

    // Si no hay token redirige a login
    if (!token) {
      url.pathname = "/es";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

// Configuración de middleware
export const config = {
  matcher: ["/:path*"],
};

