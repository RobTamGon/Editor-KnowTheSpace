// app/api/auth/nextauth/route.ts
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { supabase } from "../../../../lib/supabase";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async signIn({ user }) {
      // Upsert básico en Supabase (solo email/username)
      const { error } = await supabase.from("users").upsert(
        { email: user.email, username: user.name },
        { onConflict: "email" }
      );
      return !error;
    },

    async session({ session, token }) {
      // Aseguramos que session.user tenga username
      session.user = session.user || {};
      session.user.username = session.user.username ?? token.name;
      return session;
    },

    async jwt({ token, profile }) {
      if (profile) {
        token.name = profile.name;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
//     async signIn({ user }) {
//       const email = user.email

//       // Guardar o actualizar usuario en Supabase
//       const { data, error } = await supabase
//         .from("users")
//         .upsert(
//           {
//             email: user.email,
//             username: user.name,
//             // image: user.image,
//           },
//           { onConflict: "email" }
//         )

//       if (error) {
//         console.error("Error guardando usuario:", error)
//         return false
//       }

//       return true
//     },

//     async session({ session, token }) {
//       session.user = {
//         username: token.name,
//         email: token.email,
//         // image: token.picture,
//       }
//       return session
//     },

//     async jwt({ token, account, profile }) {
//       if (account && profile) {
//         token.name = profile.name
//         token.email = profile.email
//         // token.picture = profile.picture
//       }
//       return token
//     },
//   },
// }

// const handler = NextAuth(authOptions)
// export { handler as GET, handler as POST }
