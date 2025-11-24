// /app/api/auth/login/route.js
import { supabase } from "../../../../../lib/supabase";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req) {
  const { email, password_hash } = await req.json();

  const { data: users, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .limit(1);

  if (error || users.length === 0) {
    return Response.json({ error: "Credenciales inválidas" }, { status: 401 });
  }

  const username = users[0];

  const valid = await bcrypt.compare(password_hash, username.password_hash);

  if (!valid) {
    return Response.json({ error: "Contraseña incorrecta" }, { status: 401 });
  }

  // Crear token
  const token = jwt.sign(
    { id: user.id, email: user.email, username: user.username },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  // Guardar token en cookie httpOnly
  return new Response(JSON.stringify({ message: "Login correcto" }), {
    status: 200,
    headers: {
      "Set-Cookie": `session=${token}; HttpOnly; Path=/; Max-Age=604800`,
    },
  });
}
