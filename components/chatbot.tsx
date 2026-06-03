"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X } from "lucide-react";

type Message = {
  role: "user" | "bot";
  text: string;
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Welcome To BookStay. Hello! How can I help you with your stay today?",
    },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulated bot reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Let me check that for you..." },
      ]);
    }, 800);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-primary text-white p-4 rounded-full shadow-lg"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-[350px] h-[500px] bg-white shadow-xl rounded-2xl flex flex-col border animate-fadeIn">
          {/* Header */}
          <div className="bg-blue-300 text-primary-600 p-4 rounded-t-2xl font-semibold flex justify-between items-center">
            SUNIO Hotel Assistant
            <button onClick={() => setIsOpen(false)}>
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-background">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-xl max-w-[70%] text-sm ${
                    msg.role === "user"
                      ? "bg-chatUser text-white"
                      : "bg-chatBot text-black"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t flex gap-2">
            <input
              type="text"
              placeholder="Ask about rooms, bookings..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-secondary text-white px-4 rounded-lg hover:opacity-90"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
