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
        className="py-3 rounded-xl font-bold bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-600/40"
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
