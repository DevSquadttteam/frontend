export default function ChatHistory({ messages }: { messages: string[] }) {
  return (
    <div className="space-y-2">
      {messages.map((msg, i) => (
        <div key={i} className="p-2 border rounded bg-gray-50">
          {msg}
        </div>
      ))}
    </div>
  );
}
