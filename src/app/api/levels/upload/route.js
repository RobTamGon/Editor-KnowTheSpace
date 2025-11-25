// // // /app/api/levels/upload/route.js
// // import { NextResponse } from "next/server";
// // import { supabase } from "../../../../lib/supabase";
// // import { getUnifiedSession } from "../../../../lib/session";

// // export async function POST(req) {
// //   try {
// //     // const session = await getUnifiedSession();

// //     const cookieStore = await cookies(); 
// //     const user = getUserFromCookie(cookieStore);

// //     if (!user) {
// //       return NextResponse.json(
// //         { error: "No estás autenticado." },
// //         { status: 401 }
// //       );
// //     }

// //     const body = await req.json();
// //     const { dataJSON } = body; 

// //     if (!dataJSON) {
// //       return NextResponse.json(
// //         { error: "Falta el JSON del nivel." },
// //         { status: 400 }
// //       );
// //     }

// //     const { error } = await supabase
// //       .from("levels")
// //       .insert({
// //         id_user: user.id,
// //         data: dataJSON,
// //         creation_date: new Date(),
// //       });

// //     if (error) {
// //       console.error(error);
// //       return NextResponse.json(
// //         { error: "Error al subir el nivel." },
// //         { status: 500 }
// //       );
// //     }

// //     return NextResponse.json({ success: true, message: "Nivel subido correctamente." });

// //   } catch (err) {
// //     console.error(err);
// //     return NextResponse.json(
// //       { error: "Error inesperado." },
// //       { status: 500 }
// //     );
// //   }

// import { NextResponse } from "next/server";
// import { supabase } from "../../../../lib/supabase";
// import { getUnifiedSession } from "../../../../lib/session";

// export async function POST(req) {
  
//   const text = await res.text();
//   console.log(text); 
//   try {
//     const session = await getUnifiedSession(); // 🔹 usamos sesión unificada

//     if (!session?.user) {
//       return NextResponse.json(
//         { error: "No estás autenticado." },
//         { status: 401 }
//       );
//     }

//     const body = await req.json();
//     const { dataJSON } = body;

//     if (!dataJSON) {
//       return NextResponse.json(
//         { error: "Falta el JSON del nivel." },
//         { status: 400 }
//       );
//     }

//     const { error } = await supabase
//       .from("levels")
//       .insert({
//         id_user: session.user.id, // 🔹 usamos id del usuario de cualquiera de las dos sesiones
//         data: dataJSON,
//         creation_date: new Date(),
//       });

//     if (error) {
//       console.error(error);
//       return NextResponse.json(
//         { error: "Error al subir el nivel." },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json({ success: true, message: "Nivel subido correctamente." });

//   } catch (err) {
//     console.error(err);
//     return NextResponse.json(
//       { error: "Error inesperado." },
//       { status: 500 }
//     );
//   }
// }

