"use client";
import { useState } from "react";
import FloatingChatWidget from "./FloatingChatWidget";

// Componente para el asistente de niveles
export default function ChatAssistant() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  // Función para enviar un mensaje al asistente
  async function sendMessage() {
    if (!input.trim()) return;

    // Añade el mensaje al array de mensajes
    setMessages((prev) => [...prev, { from: "user", text: input }]);

    // Limpia el input
    setInput("");

    // Envia el mensaje al servidor
    const response = await fetch("/api/ai/editorassistant", {
      method: "POST",
      body: JSON.stringify({ message: input }),
    });

    // Obtiene la respuesta del servidor
    const data = await response.json();

    // Añade la respuesta al array de mensajes
    setMessages((prev) => [...prev, { from: "assistant", text: data.answer }]);

    setInput("");
  }

  return (
    <div className="p-6">
      <FloatingChatWidget
        messages={messages}
        input={input}
        setInput={setInput}
        sendMessage={sendMessage}
      />
    </div>
    
  );
}
