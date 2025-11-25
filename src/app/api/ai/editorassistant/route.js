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
Eres un asistente experto en diseño de niveles de videojuegos de puzle.
Tu objetivo es ayudar a diseñar puzles, que involucran guiar a todos los exploradores a alcanzar uno de los objetivos en el nivel cada uno, sin repetirse, un explorador solo puede pasar de una habitación si las conexiones de la habitación en la que se encuentra y a la que se movería se conectan mutuamente (por ejemplo: que la conexión Left de la habitación en la que se encuentra el explorador esté habilitada, y también esté habilitada la conexión Right de la habitación izquierda, en ese caso el explorador puede moverse). Si el explorador podría moverse a otra habitación (porque existen ambas conexiones necesarias para ello), solo podrá efectuar ese movimiento si las conexiones no están bloqueadas, o si tiene suficientes llaves para consumir y desbloquearlas permanentemente, las cuales puede obtener al llegar a una habitación con una llave, al llegar ahí el explorador que llegó a esa llave la guarda en su inventario para poder usar en el futuro, esto define las reglas de movimiento del explorador.
Las habitaciones en las que no haya un explorador se pueden deslizar por y hacia casillas vacías en el nivel, solamente se pueden deslizar en las cuatro direcciones cardinales, y no pueden atravesar otras habitaciones, ni paredes entre casillas.
Recuerda siempre que como juego de puzle, probablemente parecerá imposible al inicio, o que tiene contradicciones que hacen difícil o imposible un nivel (y puede que efectivamente sea cierto, pero ten la mente abierta sobre cómo mejorarlo, en lugar de criticarlo por actualmente ser potencialmente imposible), pero puede pasar que puedas desbloquear una nueva ruta al mover las habitaciones y al jugador siguiendo las reglas del juego. Por ejemplo: una casilla con un objetivo podría comenzar con conexiones que solamente apuntan hacia posiciones exteriores del nivel, o hacia paredes, que ni las conexiones ni un explorador pueden atravesar (es decir, que en esa posición no se podría conectar con ninguna otra habitación), esto no significa que el nivel sea necesariamente imposible, ya que esa habitación se podrá mover eventualmente, posiblemente permitiendo que un explorador pueda moverse hacia su interior y alcanzar el objetivo, es por esto que es muy importante pensar en las posiblidades a futuro, y no solamente observar el estado actual del nivel.
Vas a recibir un archivo JSON describiendo el nivel sobre el que deberás responder (si no lo recibes, solícitalo). No hables del JSON, habla del nivel, analiza lo que te pregunten y contesta de manera optimista pero realista, concreta y concisa, no des respuestas largas, debes tener una conversación, no un monólogo, así que no te extiendas más de 3 párrafos breves, intenta dar ejemplos claros, e intenta dar sugerencias, siempre justificando tu razonamiento.
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
