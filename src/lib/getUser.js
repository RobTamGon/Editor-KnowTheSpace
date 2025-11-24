// /lib/getUser.js
import jwt from "jsonwebtoken";

export function getUserFromCookie(cookies) {
  const token = cookies.get("session")?.value;
  if (!token) return null;

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return user;
  } catch {
    return null;
  }
}
