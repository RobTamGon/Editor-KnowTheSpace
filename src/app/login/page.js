// /app/login/page.js
"use client";

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
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl mb-4">
        {register ? "Crear cuenta" : "Iniciar sesión"}
      </h2>

      <GoogleSignInButton />

      <hr className="my-4" />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {register && (
          <input
            type="text"
            placeholder="Nombre"
            value={user}
            onChange={(e) => setUsername(e.target.value)}
            className="border p-2"
          />
        )}

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2"
        />

        <button className="bg-blue-600 text-white py-2 rounded">
          {register ? "Crear cuenta" : "Iniciar sesión"}
        </button>
      </form>

      <button
        className="mt-4 underline"
        onClick={() => setRegister(!register)}
      >
        {register ? "¿Ya tienes cuenta? Inicia sesión" : "¿Crear cuenta?"}
      </button>

      <p className="mt-4 text-red-600">{msg}</p>
    </div>
  );
}
