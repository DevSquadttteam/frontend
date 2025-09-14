"use client";
import { useState } from "react";
import ChatInput from "@/components/ChatInput";
import ChatHistory from "@/components/ChatHistory";

export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);

  const sendMessage = async (text: string) => {
    setMessages((prev) => [...prev, `👤: ${text}`]);

    const res = await fetch("/api/diagnose", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ symptoms: text, history: messages }),
    });

    const data = await res.json();
    setMessages((prev) => [...prev, `🧑‍⚕️: ${data.message}`]);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">ИИ Врач</h1>
      <ChatHistory messages={messages} />
      <ChatInput onSend={sendMessage} />
    </div>
  );
}
