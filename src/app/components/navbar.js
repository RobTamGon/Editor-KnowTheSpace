// /app/components/Navbar.js
"use client";

export default function Navbar() {
  return (
    <nav style={{ padding: 20 }}>
      <a href="/api/auth/logout">
        <button>Cerrar sesión</button>
      </a>
    </nav>
  );
}
