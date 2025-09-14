import { useState } from "react";

export default function ChatInput({ onSend }: { onSend: (text: string) => void }) {
  const [text, setText] = useState("");

  return (
    <div className="flex gap-2 mt-4">
      <input
        className="flex-1 border p-2 rounded"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Опишите симптомы..."
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => {
          onSend(text);
          setText("");
        }}
      >
        Отправить
      </button>
    </div>
  );
}
