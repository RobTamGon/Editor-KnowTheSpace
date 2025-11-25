// /app/api/localauth/register/route.js
import { supabase } from "../../../../lib/supabase";
import bcrypt from "bcryptjs";

// Función POST que recibe los datos del usuario y verifica si son correctos
export async function POST(req) {
  const {  user, email, password } = await req.json();

  if (!email || !password)
    return Response.json({ error: "Email y contraseña obligatorios" }, { status: 400 });

  // Normalizar email
  const cleanedEmail = email.trim().toLowerCase();

  // Hashear contraseña para almacenarla en la base de datos
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insertar usuario en la base de datos
  const { error } = await supabase.from("users").insert({
    user: user,
    email: cleanedEmail,
    password: hashedPassword,
  });

  if (error)
    return Response.json({ error: error.message }, { status: 400 });

  return Response.json({ message: "Usuario registrado correctamente" });
}
