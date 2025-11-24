// /app/dashboard/page.js
import { cookies } from "next/headers";
import { getUserFromCookie } from "../../lib/getUser";

export default function DashboardPage() {
  const user = getUserFromCookie(cookies());

  return (
    <div style={{ padding: 40 }}>
      <h1>Bienvenido al Dashboard</h1>

      {user ? (
        <p>Hola, {user.name || user.email}</p>
      ) : (
        <p>No estás autenticado</p>
      )}

      <a href="/api/auth/logout">
        <button style={{ marginTop: 20 }}>Cerrar sesión</button>
      </a>
    </div>
  );
}
