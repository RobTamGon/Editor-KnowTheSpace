// "use client";


// import { useState, useEffect } from "react";
// import LogoutButton from "../components/LogoutButton";



// export default function HomeView({ lang, user }) {
// 	const [Dict, setDict] = useState(null);


// 	useEffect(() => {
//     async function load() {
//       try {
//         const res = await fetch(`/locales/${lang}/common.json`);
//         const json = await res.json();
//         setDict(json);
//       } catch (err) {
//         console.error("Failed to load language JSON", err);
//       }
//     }

//     load();
//   }, [lang]);


// 	return (
// 		<>
// 			<div>
// 				<a className="flex text-center justify-center items-center px-6 w-full h-full translate-x-1/2 border-2" href="#">
// 					{Dict !== null ? Dict.Home.Search : "..."}
// 				</a>
// 			</div>

// 			<div>
// 				<a className="flex text-center justify-center items-center px-6 w-full h-full translate-x-1/2 border-2" href={lang + "/editor"}>
// 					{Dict !== null ? Dict.Home.Editor : "..."}
// 				</a>
// 			</div>

// 			<div>
// 				<a className="flex text-center justify-center items-center px-6 w-full h-full translate-x-1/2 border-2" href="#">
// 					{Dict !== null ? Dict.Home.Created_Levels : "..."}
// 				</a>
// 			</div>

// 			<div>
// 				<a className="flex text-center justify-center items-center px-6 w-full h-full translate-x-1/2 border-2" href="#">
// 					{Dict !== null ? Dict.Home.Saved_Levels : "..."}
// 				</a>
// 			</div>

// 			{/* espacio vacío */}
// 			<div />

// 			{/* LOGIN / LOGOUT */}
// 			<div>
// 				{user ? (
// 					// CERRAR SESIÓN
// 					<LogoutButton />
// 				) : (
// 					// INICIAR SESIÓN
// 					<a className="flex text-center justify-center items-center px-6 w-full h-full translate-x-1/4 border-2" href="/login">
// 						{Dict !== null ? Dict.Home.Login : "..."}
// 					</a>
// 				)}
// 			</div>

// 			<div>
// 				<a className="flex text-center justify-center items-center px-6 w-1/2 h-full translate-x-full border-2" href={lang === "es" ? "/en" : "/es"}>
// 					{Dict !== null ? Dict.Home.Language : "..."}
// 				</a>
// 			</div>
// 		</>
// 	);
// }


"use client";


import { useState, useEffect } from "react";
import LogoutButton from "../components/LogoutButton";

export default function HomeView({ lang, user }) {
  const [Dict, setDict] = useState(null);


	useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/locales/${lang}/common.json`);
        const json = await res.json();
        setDict(json);
      } catch (err) {
        console.error("Failed to load language JSON", err);
      }
    }

    load();
  }, [lang]);

  return (
    <>
      {/* NAVBAR (solo idioma + login/logout) */}
      <nav 
        className="fixed top-0 left-0 w-full h-16 flex items-center justify-between px-6 shadow-lg z-50 backdrop-blur-md"
        style={{ backgroundColor: "var(--middleground)" }}
      >
        {/* Logo izquierda */}
        <div className="flex items-center gap-2">
					<a href="#">
						<img
							src="/Logo.png"
							alt="Know the Space"
							width={56}
							height={56}
							className="hover:scale-105 transition-transform"
						/>
					</a>
					<a href="https://ai-0.itch.io/project-know-the-space-i">
						<img
							src="/QR Itch.png"
							alt="Know the Space"
							width={56}
							height={56}
							className="hover:scale-105 transition-transform"
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
              {Dict !== null ? Dict.Home.Login : "..."}
            </a>
          )}

          {/* Idioma */}
          <a
            href={lang === "es" ? "/en" : "/es"}
            className="px-4 py-2 border rounded-xl hover:bg-white/10 hover:shadow-[0px_6px_18px_rgba(0,0,0,0.25)] transition-all"
          >
            {Dict !== null ? Dict.Home.Language : "..."}
          </a>
        </div>
      </nav>

      {/* CONTENIDO PRINCIPAL */}
      <main className="pt-24 px-6 text-center">
        <h1 className="text-4xl font-bold opacity-80 mb-6">
          {Dict !== null ? Dict.Home.Title : "..."}
        </h1>
        <p className="text-lg opacity-75 mb-12">
          {Dict !== null ? Dict.Home.Subtitle : "..."}
        </p>

        {/* BOTONES CENTRALES */}
        <div className="flex justify-center gap-6 flex-wrap mt-6">
          <CenterButton text={Dict !== null ? Dict.Home.Search : "..."} href="#" />
          <CenterButton text={Dict !== null ? Dict.Home.Editor : "..."}href={"/" + lang + "/editor"} />
          <CenterButton text={Dict !== null ? Dict.Home.Created_Levels : "..."} href="#" />
          <CenterButton text={Dict !== null ? Dict.Home.Saved_Levels : "..."} href="#" />
        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full text-center py-6 mt-16 opacity-70 text-sm">
        © {new Date().getFullYear()} Know The Space — {Dict !== null ? Dict.Home.Footer : "..."}
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