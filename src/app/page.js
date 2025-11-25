// export default function Home() {
//   const NavBar_Style = {
//     backgroundColor: `var(--middleground)`
//   };


//   return (
//     <>
//       <div className="absolute w-full h-16 grid grid-cols-8 grid-row-1" style={NavBar_Style}>
//         <div className="size-16 cursor-pointer">
//           <a href="#">
//             <img className=""
//               src="/Logo.png"
//               alt="Know the Space"
//               width={64}
//               height={64}
//             />
//           </a>
//         </div>
//         <div>
//           <a className="flex text-center justify-center items-center px-6 w-full h-full translate-x-1/2 border-2" href="#">Buscar niveles</a>
//         </div>
//         <div>
//           <a className="flex text-center justify-center items-center px-6 w-full h-full translate-x-1/2 border-2" href="/editor">Editor</a>
//         </div>
//         <div>
//           <a className="flex text-center justify-center items-center px-6 w-full h-full translate-x-1/2 border-2" href="#">Niveles creados</a>
//         </div>
//         <div>
//           <a className="flex text-center justify-center items-center px-6 w-full h-full translate-x-1/2 border-2" href="#">Niveles guardados</a>
//         </div>
//         <div />
//         <div>
//           <a className="flex text-center justify-center items-center px-6 w-full h-full translate-x-1/4 border-2" href="/login">Iniciar sesión</a>
//         </div>
//         <div>
//           <a className="flex text-center justify-center items-center px-6 w-1/2 h-full translate-x-full border-2" href="#">Idioma</a>
//         </div>
//       </div>
//     </>
//   );
// }
// /app/home/page.js
import { getUserFromCookie } from "../lib/getUser";
import Home from "./home/page";

export default function HomePage() {
  const user = getUserFromCookie(); 

  const NavBar_Style = {
    backgroundColor: `var(--middleground)`
  };

  return (
    <>
      <Home />
    </>
  );
}
