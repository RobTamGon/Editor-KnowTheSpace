// /app/api/auth/register/route.js
import { supabase } from "../../../../../lib/supabase";
import bcrypt from "bcrypt";

export async function POST(req) {
  const { email, password_hash, username } = await req.json();

  if (!email || !password_hash)
    return Response.json({ error: "Email y contraseña obligatorios" }, { status: 400 });

  const hashedPassword = await bcrypt.hash(password_hash, 10);

  const { error } = await supabase.from("users").insert({
    email,
    username,
    password_hash: hashedPassword,
  });

  if (error)
    return Response.json({ error: error.message }, { status: 400 });

  return Response.json({ message: "Usuario registrado correctamente" });
}
