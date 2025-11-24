import GoogleSignInButton from "./components/GoogleSignInButton"
import LoginPage from "./login/page";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">KnowTheSpace</h1>
      <GoogleSignInButton />
      <LoginPage />
    </main>
  )
}
