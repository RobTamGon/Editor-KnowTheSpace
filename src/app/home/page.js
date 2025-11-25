//// /app/home/page.js
//import { cookies } from "next/headers";
//import { getUserFromCookie } from "../../lib/getUser";
//import LogoutButton from "../components/LogoutButton";
//
//export default async function Home() {
//  // Obtiene el cookie local_session y el usuario asociado
//  const cookieStore = await cookies(); 
//  const user = getUserFromCookie(cookieStore); 
//
//  const NavBar_Style = {
//    backgroundColor: `var(--middleground)`
//  };
//
//  return (
//    <>
//      <div className="absolute w-full h-16 grid grid-cols-8 grid-row-1" style={NavBar_Style}>
//        <div className="size-16 cursor-pointer">
//          <a href="#">
//            <img
//              src="/Logo.png"
//              alt="Know the Space"
//              width={64}
//              height={64}
//            />
//          </a>
//        </div>
//
//        <div>
//          <a className="flex text-center justify-center items-center px-6 w-full h-full translate-x-1/2 border-2" href="#">
//            Buscar niveles
//          </a>
//        </div>
//
//        <div>
//          <a className="flex text-center justify-center items-center px-6 w-full h-full translate-x-1/2 border-2" href="/editor">
//            Editor
//          </a>
//        </div>
//
//        <div>
//          <a className="flex text-center justify-center items-center px-6 w-full h-full translate-x-1/2 border-2" href="#">
//            Niveles creados
//          </a>
//        </div>
//
//        <div>
//          <a className="flex text-center justify-center items-center px-6 w-full h-full translate-x-1/2 border-2" href="#">
//            Niveles guardados
//          </a>
//        </div>
//
//        {/* espacio vacío */}
//        <div />
//
//        {/* LOGIN / LOGOUT */}
//        <div>
//          {user ? (
//            // CERRAR SESIÓN
//            <LogoutButton />
//          ) : (
//            // INICIAR SESIÓN
//            <a className="flex text-center justify-center items-center px-6 w-full h-full translate-x-1/4 border-2" href="/login">
//              Iniciar sesión
//            </a>
//          )}
//        </div>
//
//        <div>
//          <a className="flex text-center justify-center items-center px-6 w-1/2 h-full translate-x-full border-2" href="#">
//            Idioma
//          </a>
//        </div>
//        
//      </div>
//    </>
//  );
//}
//
// /app/home/page.js
import { cookies } from "next/headers";
import { getUserFromCookie } from "../../lib/getUser";
import LogoutButton from "../components/LogoutButton";

export default async function Home() {
  const cookieStore = await cookies(); 
  const user = getUserFromCookie(cookieStore);

  return (
    <>
      {/* NAVBAR (solo idioma + login/logout) */}
      <nav 
        className="fixed top-0 left-0 w-full h-16 flex items-center justify-between px-6 shadow-lg z-50 backdrop-blur-md"
        style={{ backgroundColor: "var(--middleground)" }}
      >
        {/* Logo izquierda */}
        <div className="flex items-center gap-2">
          <img
            src="/Logo.png"
            alt="Know the Space"
            width={56}
            height={56}
            className="hover:scale-105 transition-transform cursor-pointer"
          />
          <a href="https://ai-0.itch.io/project-know-the-space-i">
            <img
              src="/QR Itch.png"
              alt="Know the Space"
              width={56}
              height={56}
              className="hover:scale-105 transition-transform cursor-pointer"
            />
          </a>
        </div>

        {/* Lado derecho */}
        <div className="flex gap-4 items-center">

          {/* Login / Logout */}
          {user ? (
            <LogoutButton />
          ) : (
            <a
              href="/login"
              className="px-4 py-2 border rounded-xl hover:bg-white/10 hover:shadow-[0px_6px_18px_rgba(0,0,0,0.25)] transition-all"
            >
              Iniciar sesión
            </a>
          )}

          {/* Idioma */}
          <a
            href="#"
            className="px-4 py-2 border rounded-xl hover:bg-white/10 hover:shadow-[0px_6px_18px_rgba(0,0,0,0.25)] transition-all"
          >
            Idioma
          </a>
        </div>
      </nav>

      {/* CONTENIDO PRINCIPAL */}
      <main className="pt-24 px-6 text-center">
        <h1 className="text-4xl font-bold opacity-80 mb-6">
          Bienvenido a Know the Space
        </h1>
        <p className="text-lg opacity-75 mb-12">
          Explora, crea y comparte niveles con la comunidad.
        </p>

        {/* BOTONES CENTRALES */}
        <div className="flex justify-center gap-6 flex-wrap mt-6">
          <CenterButton text="Buscar niveles" href="#" />
          <CenterButton text="Editor" href="/editor" />
          <CenterButton text="Niveles creados" href="#" />
          <CenterButton text="Niveles guardados" href="#" />
        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full text-center py-6 mt-16 opacity-70 text-sm">
        © {new Date().getFullYear()} Know The Space — Todos los derechos reservados.
      </footer>
    </>
  );
}

/* Botón central reutilizable */
function CenterButton({ text, href }) {
  return (
    <a
      href={href}
      className="
        px-6 py-3 min-w-48 text-center 
        border rounded-xl 
        hover:bg-white/10
        transition-all
        text-lg
      "
    >
      {text}
    </a>
  );
}
