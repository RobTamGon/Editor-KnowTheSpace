// /app/api/localauth/login/route.js
// Ruta para manejar el login de usuarios con autenticación local
import { supabase } from "../../../../lib/supabase";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Función POST que recibe los datos del usuario y verifica si son correctos
export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const cleanedEmail = (email || "").trim().toLowerCase();

    // Verifica si el usuario existe y si la contraseña es correcta
    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", cleanedEmail)
      .single();

    if (error || !user) {
      return Response.json({ error: "Credenciales inválidas" }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return Response.json({ error: "Contraseña incorrecta" }, { status: 401 });
    }

    // Crea token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, username: user.username },
      process.env.JWT_SECRET || "",
      { expiresIn: "7d" }
    );

    // Construye cookie; añade Secure solo en producción, actualmente en prueba
    const sameSite = "Lax";
    const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";

    // Crea cookie
    const cookieValue = `local_session=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite=${sameSite}${secure}`;

    // Devuelve respuesta con el token JWT y el usuario
    return new Response(JSON.stringify({ message: "Login correcto", user: { id: user.id, email: user.email, user: user.user } }), {
      status: 200,
      headers: {
        "Set-Cookie": cookieValue,
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    return Response.json({ error: "Error interno" }, { status: 500 });
  }
}
