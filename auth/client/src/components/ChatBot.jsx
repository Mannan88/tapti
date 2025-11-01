import React, { useState } from "react";

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I'm Crisis Assistant. How can I help you?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

 const sendMessage = async () => {
  if (!input.trim()) return;

  const userMessage = { sender: "user", text: input };
  setMessages((prev) => [...prev, userMessage]);
  setInput(""); // clear input box

  const response = await fetch("http://localhost:3000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: input }),
  });

  const data = await response.json();
  setMessages((prev) => [
    ...prev,
    { sender: "bot", text: data.reply || "Sorry, I didn’t understand that." },
  ]);
};


  return (
    <div className="flex flex-col h-[70vh] w-full max-w-lg mx-auto bg-white/50 backdrop-blur-lg rounded-2xl shadow-xl border border-white/40 p-4">
      <div className="flex-grow overflow-y-auto space-y-3 p-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-[75%] ${
                msg.sender === "user"
                  ? "bg-indigo-500 text-white"
                  : "bg-white text-gray-800 shadow"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-sm text-gray-500 animate-pulse">Typing...</div>
        )}
      </div>

      <div className="flex items-center gap-2 mt-3">
        <input
          type="text"
          className="flex-grow p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Type your message..."   
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-xl shadow-md"
        >
          Send
        </button>
      </div>
    </div>
  );
}
