"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bot, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { FormEvent, useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! I&apos;m StayNest AI. Ask me to find homestays, plan trips, or get personalized recommendations.",
    },
  ]);
  const [typing, setTyping] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  const SUGGESTED_PROMPTS = [
    "Find me mountain stays under ₹3000",
    "Suggest honeymoon stays",
    "Weekend trip from Delhi",
    "Family stay with parking",
    "Pet friendly cottages",
  ];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingContent]);

  const sendMessage = async (text: string) => {
    const message = text.trim();
    if (!message || typing) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      content: message,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);
    setStreamingContent("");

    try {
      const conversationHistory = messages.slice(-8).map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content.slice(0, 2_000),
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          conversationHistory,
        }),
      });

      if (!response.ok) {
        throw new Error((await response.text()) || "StayNest AI is temporarily unavailable. Please try again.");
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("StayNest AI did not return a response. Please try again.");

      const decoder = new TextDecoder();
      let fullResponse = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          const remaining = decoder.decode();
          if (remaining) {
            fullResponse += remaining;
            setStreamingContent(fullResponse);
          }
          break;
        }
        fullResponse += decoder.decode(value, { stream: true });
        setStreamingContent(fullResponse);
      }

      if (!fullResponse.trim()) {
        throw new Error('StayNest AI did not return a response. Please try again.');
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          content: fullResponse,
        },
      ]);
    } catch (error) {
      console.error('ChatWidget request failed:', error);
      const errorMessage = error instanceof Error ? error.message : 'StayNest AI is temporarily unavailable. Please try again.';
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: "assistant",
          content: errorMessage,
        },
      ]);
    } finally {
      setTyping(false);
      setStreamingContent("");
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed bottom-24 right-4 z-50 flex h-[min(520px,calc(100vh-8rem))] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900 sm:right-6"
          >
            <div className="flex items-center justify-between bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                  <Bot className="h-4 w-4" strokeWidth={2} />
                </span>
                <div>
                  <p className="text-sm font-bold">StayNest AI</p>
                  <p className="text-[10px] text-emerald-100">Always here to help</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="rounded-full p-1.5 hover:bg-white/20 transition-colors"
              >
                <X className="h-4 w-4" strokeWidth={2} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50 dark:bg-gray-950">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={[
                    "max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                    msg.role === "user"
                      ? "ml-auto bg-emerald-600 text-white rounded-br-md"
                      : "bg-white text-gray-700 border border-gray-100 rounded-bl-md dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700",
                  ].join(" ")}
                >
                  <span className="whitespace-pre-wrap">{msg.content}</span>
                </motion.div>
              ))}

              {typing && streamingContent && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-[85%] rounded-2xl rounded-bl-md bg-white border border-gray-100 px-3.5 py-2.5 text-sm leading-relaxed dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700"
                >
                  <span className="whitespace-pre-wrap">{streamingContent}</span>
                  <span className="inline-block animate-pulse">▋</span>
                </motion.div>
              )}

              {typing && !streamingContent && (
                <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-white border border-gray-100 px-4 py-3 w-fit dark:bg-gray-800 dark:border-gray-700">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="h-2 w-2 rounded-full bg-gray-400"
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.15,
                      }}
                    />
                  ))}
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="border-t border-gray-100 p-3 dark:border-gray-800">
              <div className="mb-2 flex gap-1.5 overflow-x-auto pb-1">
                {SUGGESTED_PROMPTS.slice(0, 3).map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => sendMessage(prompt)}
                    disabled={typing}
                    className="shrink-0 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[10px] font-medium text-emerald-700 hover:bg-emerald-100 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-300"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about stays, trips..."
                  disabled={typing}
                  className="flex-1 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white"
                  disabled={typing || !input.trim()}
                >
                  <Send className="h-4 w-4" strokeWidth={2} />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Open AI chat"
        className="fixed bottom-6 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-600/30 sm:right-6"
      >
        {open ? (
          <X className="h-6 w-6" strokeWidth={2} />
        ) : (
          <MessageCircle className="h-6 w-6" strokeWidth={2} />
        )}
        {!open && (
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-violet-500">
            <Sparkles className="h-2.5 w-2.5 text-white" strokeWidth={2} />
          </span>
        )}
      </motion.button>
    </>
  );
}
