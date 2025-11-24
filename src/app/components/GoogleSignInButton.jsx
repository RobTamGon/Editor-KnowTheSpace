"use client"

import { signIn, signOut, useSession } from "next-auth/react"

export default function GoogleSignInButton() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return <p>Verificando sesión...</p>
  }

  if (!session) {
    return (
      <button
        onClick={() => signIn("google")}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Iniciar sesión con Google
      </button>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      <p className="font-semibold">Hola, {session.user.username}</p>

      <button
        onClick={() => signOut()}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        Cerrar sesión
      </button>
    </div>
  )
}
