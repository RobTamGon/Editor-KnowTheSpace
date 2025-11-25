"use client";

import { useState, useEffect } from "react";

export default function FloatingChatWidget({ messages, input, setInput, sendMessage, Dict }) {
  const [open, setOpen] = useState(false);


  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 max-md:bottom-24 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-xl transition-all font-bold bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-600/40"
      >
        💬
      </button>

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-20 right-6 w-80 h-96 bg-white border shadow-xl rounded-lg flex flex-col animate-fade-in">
          {/* Header */}
          <div className="p-3 bg-blue-600 text-white font-bold flex justify-between">
            {Dict !== null ? Dict.Editor.AI.Name : "..."}
            <button className="text-white font-bold hover:text-gray-200 transition-colors" onClick={() => setOpen(false)}>✖</button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 bg-gray-100">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`p-2 my-2 rounded max-w-[90%] ${
                  m.from === "user"
                    ? "bg-blue-200 text-blue-900 ml-auto"
                    : "bg-gray-300 text-gray-900 mr-auto"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex p-2 border-t bg-white">
            <input
              key={Dict !== null ? Dict.Editor.AI.Placeholder : "..."}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={Dict !== null ? Dict.Editor.AI.Placeholder : "..."}
              className="flex-1 border p-2 rounded-l"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded-r transition-colors shadow-md"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
