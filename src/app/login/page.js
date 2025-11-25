"use client";
export const dynamic = "force-dynamic";

// /app/login/page.js

import { useState } from "react";
import GoogleSignInButton from "../components/GoogleSignInButton";

// Página de inicio de sesión
export default function LoginPage() {
  // Estados de formulario
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUsername] = useState("");
  const [register, setRegister] = useState(false);
  const [msg, setMsg] = useState("");

  // Función para enviar el formulario
  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");

    // Ruta de la petición dependiendo de login o registro
    const endpoint = register ? "/api/localauth/register" : "/api/localauth/login";

    // Envía petición a la ruta correspondiente
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ user, email, password }),
        headers: { "Content-Type": "application/json" },
      });

      // Obtiene datos de la respuesta
      let data = {};
      try {
        data = await res.json();
      } catch {
        data = { error: "Respuesta no válida del servidor" };
      }

      setMsg(data.message || data.error || "Respuesta desconocida");

      // Si la petición es exitosa y no es registro, redirige a la página de inicio
      if (res.ok && !register) {
        window.location.href = "/home"; 
      }
    } catch (err) {
      console.error(err);
      setMsg("Error de red");
    }
  }

  // Vista de formulario
  return (
    // <div className="p-6 max-w-md mx-auto">
    //   <h2 className="text-2xl mb-4">
    //     {register ? "Crear cuenta" : "Iniciar sesión"}
    //   </h2>

    //   <GoogleSignInButton />

    //   <hr className="my-4" />

    //   <form onSubmit={handleSubmit} className="flex flex-col gap-4">
    //     {register && (
    //       <input
    //         type="text"
    //         placeholder="Nombre"
    //         value={user}
    //         onChange={(e) => setUsername(e.target.value)}
    //         className="border p-2"
    //       />
    //     )}

    //     <input
    //       type="email"
    //       placeholder="Correo"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       className="border p-2"
    //     />

    //     <input
    //       type="password"
    //       placeholder="Contraseña"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //       className="border p-2"
    //     />

    //     <button className="bg-blue-600 text-white py-2 rounded">
    //       {register ? "Crear cuenta" : "Iniciar sesión"}
    //     </button>
    //   </form>

    //   <button
    //     className="mt-4 underline"
    //     onClick={() => setRegister(!register)}
    //   >
    //     {register ? "¿Ya tienes cuenta? Inicia sesión" : "¿Crear cuenta?"}
    //   </button>

    //   <p className="mt-4 text-red-600">{msg}</p>
    // </div>
    <div
      className="
        min-h-screen w-full 
        flex flex-col justify-center items-center 
        px-4
        bg-[var(--background)]
        text-[var(--foreground)]
      "
    >
      {/* Caja principal */}
      <div
        className="
          w-full max-w-md 
          bg-[var(--middleground)]/40 backdrop-blur-xl
          p-8 rounded-2xl shadow-2xl border border-[var(--foreground)]/20
        "
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          {register ? "Crear cuenta" : "Iniciar sesión"}
        </h2>

        <div className="flex flex-col gap-4">
          <GoogleSignInButton />
        </div>

        <hr className="my-6 border-[var(--foreground)]/20" />

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {register && (
            <input
              type="text"
              placeholder="Nombre"
              value={user}
              onChange={(e) => setUsername(e.target.value)}
              className="
                p-3 rounded-xl 
                bg-[var(--foreground)]/10 border border-[var(--foreground)]/20
                focus:outline-none focus:ring-2 focus:ring-blue-600 transition
              "
            />
          )}

          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              p-3 rounded-xl 
              bg-[var(--foreground)]/10 border border-[var(--foreground)]/20
              focus:outline-none focus:ring-2 focus:ring-blue-600 transition
            "
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              p-3 rounded-xl 
              bg-[var(--foreground)]/10 border border-[var(--foreground)]/20
              focus:outline-none focus:ring-2 focus:ring-blue-600 transition
            "
          />

          <button
            className="
              py-3 rounded-xl font-bold 
              bg-blue-600 text-white
              hover:bg-blue-700 transition-all 
              shadow-lg hover:shadow-blue-600/40
            "
          >
            {register ? "Crear cuenta" : "Iniciar sesión"}
          </button>
        </form>

        <button
          className="
            mt-6 w-full text-center underline 
            hover:text-blue-400 transition-all
          "
          onClick={() => setRegister(!register)}
        >
          {register ? "¿Ya tienes cuenta? Inicia sesión" : "¿Crear cuenta?"}
        </button>

        <p className="mt-4 text-red-400 text-center">{msg}</p>
      </div>

      {/* Footer */}
      <p className="mt-8 opacity-70 text-sm text-[var(--foreground)]/70">
        © {new Date().getFullYear()} Know The Space — Todos los derechos reservados.
      </p>
    </div>
  );
}
