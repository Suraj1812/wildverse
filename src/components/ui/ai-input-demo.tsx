"use client";

import { useMemo, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

export default function AiInputDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Ask me anything about animals, wildlife habitats, or conservation.",
    },
  ]);

  const canSend = useMemo(() => input.trim().length > 0 && !isLoading, [input, isLoading]);

  async function handleSubmit(message: string) {
    const trimmed = message.trim();
    if (!trimmed) return;

    setMessages((prev) => [...prev, { role: "user", text: trimmed }]);
    setInput("");
    setIsLoading(true);

    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: trimmed }),
    });

    const data = (await response.json()) as { text?: string; error?: string };

    if (!response.ok) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.error || "Request failed. Please try again.",
        },
      ]);
      setIsLoading(false);
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        text: data.text || "No response from model.",
      },
    ]);
    setIsLoading(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed right-5 bottom-5 z-50 flex items-center gap-2 rounded-full border bg-background px-4 py-3 text-sm font-medium shadow-lg transition hover:shadow-xl"
        data-aos="zoom-in-up"
        data-aos-delay="240"
      >
        <MessageCircle className="h-4 w-4" />
        Ask AI
      </button>

      {isOpen ? (
        <div
          className="fixed right-5 bottom-5 z-[60] h-[70vh] w-[92vw] max-w-sm rounded-2xl border bg-background shadow-2xl"
          data-aos="fade-up"
        >
          <div className="flex items-center justify-between border-b px-4 py-3">
            <p className="text-sm font-semibold">Wildlife Chat</p>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded p-1 text-muted-foreground hover:bg-accent"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="h-[calc(70vh-116px)] space-y-3 overflow-y-auto px-3 py-3">
            {messages.map((msg, idx) => (
              <div
                key={`${msg.role}-${idx}`}
                className={`max-w-[88%] rounded-xl px-3 py-2 text-sm ${
                  msg.role === "user"
                    ? "ml-auto bg-foreground text-background"
                    : "bg-muted text-foreground"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isLoading ? <p className="text-xs text-muted-foreground">Thinking...</p> : null}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void handleSubmit(input);
            }}
            className="flex items-center gap-2 border-t p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about animals..."
              className="h-10 flex-1 rounded-md border bg-background px-3 text-sm outline-none"
            />
            <button
              type="submit"
              disabled={!canSend}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
}
