// /app/dashboard/page.js
import { cookies } from "next/headers";
import { getUserFromCookie } from "../../lib/getUser";
import LogoutButton from "../components/dash";
import ChatAssistant from "../components/chatassistant";

// Página de inicio del dashboard
export default async function DashboardPage() {
  // Obtiene el cookie local_session y el usuario asociado
  const cookieStore = await cookies(); 
  const user = getUserFromCookie(cookieStore);

  return (
    <nav className="p-4">
      <div className="p-6">
        <h1 className="mr-2">Dashboard</h1>
        <hr className="my-4" />
        {user ? (
          <p>Hola, {user.username || user.email}</p>
        ) : (
          <p>No estás autenticado</p>
        )}
        <hr className="my-4" />
        <ChatAssistant />
        <LogoutButton />
      </div>
    </nav>
  );
}
