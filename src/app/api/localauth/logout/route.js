// // /app/api/localauth/logout/route.js
import { NextResponse } from "next/server";

// Función POST que borra el cookie local_session y redirige a inicio
export async function POST(request) {
  const response = NextResponse.json({ ok: true });

  // Borra la cookie local_session y redirigir a inicio
  response.cookies.set("local_session", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
  });

  return response;
}
