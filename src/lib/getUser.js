// /lib/getUser.js
import jwt from "jsonwebtoken";

// Función para obtener el usuario asociado al cookie local_session 
export function getUserFromCookie(cookieStore) {
  try {
    if (!cookieStore) return null;

    // Obtiene el token del cookie local_session
    const token = cookieStore.get("local_session")?.value;
    if (!token) return null;

    // Obtiene la clave secreta del JWT
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET no está definido");
      return null;
    }

    // Verifica y decodifica el token
    const user = jwt.verify(token, secret);
    return user;
  } catch (err) {
    console.error("Error verificando JWT:", err);
    return null;
  }
}
