// app/components/dash.js
"use client";

// Botón para cerrar sesión
export default function LogoutButton() {
  // Función para cerrar sesión
  const handleLogout = async () => {
    // Envía petición a la ruta de logout
    try {
      await fetch("/api/localauth/logout", { method: "POST", credentials: "include" });
    } catch (err) {
      console.error(err);
    } finally {
      // borrar cookies en navegador y redirigir a inicio
      window.location.href = "/";
    }
  };

  return (
    // Botón con estilo de logout
    // <button onClick={handleLogout} className="flex text-center justify-center items-center px-6 w-full h-full translate-x-1/4 border-2">
    //   Cerrar sesión
    // </button>
    <button
      onClick={handleLogout}
      className=" flex justify-center items-center px-4 py-2 rounded-xl border hover:bg-white/10 hover:shadow-[0px_6px_18px_rgba(0,0,0,0.25)] transition-all"
      >
        Cerrar sesión
    </button>


  );
}
