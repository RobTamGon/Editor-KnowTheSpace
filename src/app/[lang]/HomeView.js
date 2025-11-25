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
			<div>
				<a className="flex text-center justify-center items-center px-6 w-full h-full translate-x-1/2 border-2" href="#">
					{Dict !== null ? Dict.Home.Search : "..."}
				</a>
			</div>

			<div>
				<a className="flex text-center justify-center items-center px-6 w-full h-full translate-x-1/2 border-2" href={lang + "/editor"}>
					{Dict !== null ? Dict.Home.Editor : "..."}
				</a>
			</div>

			<div>
				<a className="flex text-center justify-center items-center px-6 w-full h-full translate-x-1/2 border-2" href="#">
					{Dict !== null ? Dict.Home.Created_Levels : "..."}
				</a>
			</div>

			<div>
				<a className="flex text-center justify-center items-center px-6 w-full h-full translate-x-1/2 border-2" href="#">
					{Dict !== null ? Dict.Home.Saved_Levels : "..."}
				</a>
			</div>

			{/* espacio vacío */}
			<div />

			{/* LOGIN / LOGOUT */}
			<div>
				{user ? (
					// CERRAR SESIÓN
					<LogoutButton />
				) : (
					// INICIAR SESIÓN
					<a className="flex text-center justify-center items-center px-6 w-full h-full translate-x-1/4 border-2" href="/login">
						{Dict !== null ? Dict.Home.Login : "..."}
					</a>
				)}
			</div>

			<div>
				<a className="flex text-center justify-center items-center px-6 w-1/2 h-full translate-x-full border-2" href="#">
					{Dict !== null ? Dict.Home.Language : "..."}
				</a>
			</div>
		</>
	);
}