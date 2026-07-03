"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, Sparkles, Minimize2, Maximize2, User } from "lucide-react";
import { streamChatWithAI } from "@/lib/ai";
import Button from "@/components/ui/Button";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm your AI travel assistant. I can help you find the perfect homestay, plan trips, or answer questions about destinations in India. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamedContent, setStreamedContent] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamedContent]);

  const handleSend = async () => {
    if (!input.trim() || isStreaming) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage, timestamp: new Date() }]);
    setIsStreaming(true);
    setStreamedContent("");

    try {
      const conversationHistory = messages.slice(-10).map((m) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      }));

      let fullResponse = "";
      for await (const chunk of streamChatWithAI(userMessage, conversationHistory)) {
        fullResponse += chunk;
        setStreamedContent(fullResponse);
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: fullResponse, timestamp: new Date() },
      ]);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Sorry, I encountered an error. Please try again.';
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: errorMessage,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsStreaming(false);
      setStreamedContent("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickPrompts = [
    "Find homestays under ₹5000 in Manali",
    "Plan a 3-day trip to Goa for 2 people",
    "Best places for honeymoon in India",
    "Pet-friendly homestays near mountains",
  ];

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        onClick={() => {
          setIsOpen(true);
          setIsMinimized(false);
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-primary text-white shadow-lg shadow-emerald-500/30 transition-all ${
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <Bot className="h-6 w-6" />
      </motion.button>

      {/* AI Assistant Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`fixed bottom-6 right-6 z-50 w-[400px] glass-strong rounded-2xl shadow-2xl ${
              isMinimized ? "h-16" : "h-[600px]"
            } flex flex-col overflow-hidden`}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border bg-gradient-primary/10 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary text-white">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">AI Travel Assistant</h3>
                  <p className="text-xs text-muted-foreground">Powered by StayNest</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-2 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.role === "assistant" && (
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-primary text-white">
                          <Bot className="h-4 w-4" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          message.role === "user"
                            ? "bg-gradient-primary text-white"
                            : "bg-card border border-border"
                        }`}
                      >
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                        <p className="mt-1 text-xs opacity-60">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                      {message.role === "user" && (
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary">
                          <User className="h-4 w-4" />
                        </div>
                      )}
                    </motion.div>
                  ))}

                  {isStreaming && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3 justify-start"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-primary text-white">
                        <Bot className="h-4 w-4" />
                      </div>
                      <div className="max-w-[80%] rounded-2xl bg-card border border-border px-4 py-3">
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                          {streamedContent}
                          <span className="inline-block animate-pulse">▋</span>
                        </p>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Prompts */}
                {messages.length === 1 && !isStreaming && (
                  <div className="px-4 pb-2">
                    <p className="mb-2 text-xs font-medium text-muted-foreground">Try asking:</p>
                    <div className="flex flex-wrap gap-2">
                      {quickPrompts.map((prompt, index) => (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          onClick={() => setInput(prompt)}
                          className="rounded-full border border-border bg-card px-3 py-1.5 text-xs text-muted-foreground hover:border-primary hover:text-primary transition-colors"
                        >
                          {prompt}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="border-t border-border bg-card/50 p-4">
                  <div className="flex items-center gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about homestays, trips, or destinations..."
                      className="flex-1 rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      disabled={isStreaming}
                    />
                    <Button
                      onClick={handleSend}
                      disabled={!input.trim() || isStreaming}
                      size="md"
                      className="shrink-0"
                    >
                      {isStreaming ? (
                        <Sparkles className="h-4 w-4 animate-pulse" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
