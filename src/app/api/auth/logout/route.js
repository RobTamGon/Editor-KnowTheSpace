// /app/api/auth/logout/route.js

export async function GET() {
  return new Response("Logout successful", {
    status: 200,
    headers: {
      "Set-Cookie": "session=; HttpOnly; Path=/; Max-Age=0",
    },
  });
}
