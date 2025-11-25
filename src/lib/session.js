// // /lib/session.js
// import { cookies } from "next/headers";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { getUserFromCookie } from "./getUser";

// export async function getUnifiedSession() {
//   // 1) Sesión Google/NextAuth
//   const googleSession = await getServerSession(authOptions);

//   if (googleSession?.user) {
//     return {
//       type: "google",
//       user: {
//         id: googleSession.user.id,
//         name: googleSession.user.name,
//         email: googleSession.user.email,
//         image: googleSession.user.image,
//       },
//     };
//   }

//   // 2) Sesión local mediante cookie
//   const cookieStore = cookies();
//   const user = getUserFromCookie(cookieStore);
//   if (user) {
//     try {
//       return {
//         user
//       };
//     } catch {
//       return null;
//     }
//   }

//   // 3) No hay sesión
//   return null;
// }
// import { cookies } from "next/headers";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
// import { getUserFromCookie } from "./getUser";

// export async function getUnifiedSession() {
//   // 1️⃣ Sesión Google/NextAuth
//   const googleSession = await getServerSession(authOptions);

//   if (googleSession?.user) {
//     return {
//       type: "google",
//       user: {
//         id: googleSession.user.id,
//         name: googleSession.user.name,
//         email: googleSession.user.email,
//         image: googleSession.user.image,
//       },
//     };
//   }

//   // Sesión local mediante cookie
//   const cookieStore = cookies(); // 🔹 no usar await
//   const user = getUserFromCookie(cookieStore);
//   if (user) {
//     return { user };
//   }

//   // No hay sesión
//   return null;
// // }
// import { cookies } from "next/headers";
// import { getServerSession } from "next-auth";
// import { authOptions } from "/../app/api/auth/[...nextauth]/route.js";
// import { getUserFromCookie } from "./getUser";

// export async function getUnifiedSession() {
//   // 1️⃣ Google / NextAuth
//   const googleSession = await getServerSession(authOptions);
//   if (googleSession?.user) {
//     return {
//       type: "google",
//       user: {
//         id: googleSession.user.id,
//         name: googleSession.user.name,
//         email: googleSession.user.email,
//         image: googleSession.user.image,
//       },
//     };
//   }

//   // 2️⃣ Usuario local
//   const cookieStore = cookies();
//   const user = getUserFromCookie(cookieStore);
//   if (user) {
//     return { type: "local", user };
//   }

//   return null;
// }
