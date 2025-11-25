import LoginPage from "./login/page";

// Página de inicio de la aplicación
export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">KnowTheSpace</h1>
      <LoginPage />
    </main>
  )
}
