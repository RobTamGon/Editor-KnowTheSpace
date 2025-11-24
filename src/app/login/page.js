// /app/login/page.js
"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password_hash, setPassword] = useState("");
  const [username, setName] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [msg, setMsg] = useState("");

  async function handleAuth(e) {
    e.preventDefault();

    const endpoint = isRegister ? "/api/auth/register" : "/api/auth/login";

    const res = await fetch(endpoint, {
      method: "POST",
      body: JSON.stringify({ email, password_hash, username }),
    });

    const data = await res.json();
    setMsg(data.message || data.error);

    if (res.ok && !isRegister) {
      window.location.href = "/"; // login correcto
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">KnowTheSpace</h1>
    <div style={{ padding: 40 }}>
      <h3>Iniciar Sesión</h3>

      {/* BOTÓN GOOGLE */}
      {/* <GoogleSignInButton /> */}

      <hr style={{ margin: "20px 0" }} />

      {/* BOTÓN EMAIL */}
      <button onClick={() => setIsRegister(false)}>Iniciar con Email</button>
      <button onClick={() => setIsRegister(true)}>Crear cuenta</button>

      <form onSubmit={handleAuth} style={{ marginTop: 20 }}>
        {isRegister && (
          <input
            type="text"
            placeholder="Nombre"
            value={username}
            onChange={(e) => setName(e.target.value)}
            style={{ display: "block", marginBottom: 10 }}
          />
        )}

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ display: "block", marginBottom: 10 }}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password_hash}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: "block", marginBottom: 10 }}
        />

        <button type="submit">{isRegister ? "Crear cuenta" : "Iniciar sesión"}</button>
      </form>

      <p style={{ marginTop: 20 }}>{msg}</p>
    </div>
    </main>
  );
}
