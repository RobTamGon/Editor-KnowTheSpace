// /app/api/ai/editorassistant/route.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Inicializa cliente Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Ruta para generar respuestas a partir de un mensaje
export async function POST(req) {
  try {
    const { message } = await req.json();

    if (!message) {
      return Response.json({ error: "Mensaje requerido" }, { status: 400 });
    }

    // Selecciona modelo Gemini
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    // Crea respuesta del chat
    const result = await model.generateContent([
      {
        text: `
Eres un asistente experto en diseño de niveles del videojuego KnowTheSpace.
Ayudas a diseñar los puzzles, distribución espacial del jugador, la salida,
llaves y puertas que se abren con llaves, organización de componentes y
conexiones entre las piezas del puzzle, y progresión lógica y espacial del juego.
Responde de forma clara, estructurada y útil.
        `
      },
      {
        text: message
      }
    ]);

    // Obtiene el texto de la respuesta
    const answer = result.response.text();

    return Response.json({ answer });

  } catch (err) {
    console.error("Gemini Error:", err);
    return Response.json({ error: "Error generando respuesta" }, { status: 500 });
  }
}
