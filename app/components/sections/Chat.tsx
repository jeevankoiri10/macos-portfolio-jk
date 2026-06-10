"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight, Send } from "lucide-react"
// Greeting, suggested questions, and fallback copy live in /config/chat.ts.
import { chat } from "@/config/chat"
import type { ChatAction } from "@/lib/chatContext"

interface Message {
  role: "user" | "assistant"
  content: string
  actions?: ChatAction[]
}

// Window ids → mobile section ids (they match except blogs → writing).
const MOBILE_SECTION: Record<string, string> = { blogs: "writing" }

export default function Chat({
  compact = false,
  onOpenWindow,
}: {
  compact?: boolean
  /** Threaded from Desktop.tsx - opens a window by id. Absent on mobile,
   *  where actions scroll to the matching section instead. */
  onOpenWindow?: (id: string) => void
}) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: chat.greeting },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  const hasUserMessage = messages.some((m) => m.role === "user")

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [messages, loading])

  const send = async (text: string) => {
    const question = text.trim()
    if (!question || loading) return
    const next: Message[] = [...messages, { role: "user", content: question }]
    setMessages(next)
    setInput("")
    setLoading(true)
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      })
      const data = await res.json()
      setMessages((p) => [
        ...p,
        {
          role: "assistant",
          content: data.reply ?? chat.contactFallback,
          actions: Array.isArray(data.actions) ? data.actions : undefined,
        },
      ])
    } catch {
      setMessages((p) => [...p, { role: "assistant", content: chat.contactFallback }])
    } finally {
      setLoading(false)
    }
  }

  const runAction = (a: ChatAction) => {
    if (a.url) {
      window.open(a.url, "_blank", "noopener,noreferrer")
      return
    }
    if (a.window) {
      if (onOpenWindow) {
        onOpenWindow(a.window)
      } else {
        const sectionId = MOBILE_SECTION[a.window] ?? a.window
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`flex flex-col ${compact ? "px-6 py-6 h-full" : "py-20 px-6"}`}
      style={compact ? { minHeight: 0 } : { minHeight: 480 }}
    >
      <p
        className="font-mono text-[10px] uppercase tracking-[0.14em] mb-4 flex-none"
        style={{ color: "var(--text-muted)" }}
      >
        Chat
      </p>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1" style={{ minHeight: 200 }}>
        {messages.map((m, i) => (
          <div key={i} className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}>
            <div
              className="max-w-[85%] rounded-lg px-3 py-2 text-[12px] leading-relaxed whitespace-pre-wrap"
              style={
                m.role === "user"
                  ? {
                      color: "var(--text-primary)",
                      border: "1px solid var(--accent)",
                      background: "transparent",
                    }
                  : {
                      color: "var(--text-secondary)",
                      background: "var(--widget-border)",
                      border: "1px solid var(--widget-border)",
                    }
              }
            >
              {m.content}
            </div>

            {/* Interactive action buttons under the assistant reply */}
            {m.actions && m.actions.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-1.5 max-w-[85%]">
                {m.actions.map((a, j) => (
                  <button
                    key={j}
                    onClick={() => runAction(a)}
                    className="flex items-center gap-1 font-mono text-[10px] px-2.5 py-1.5 rounded transition-colors"
                    style={{
                      color: "var(--text-secondary)",
                      border: "1px solid var(--widget-border)",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                  >
                    {a.label}
                    {a.url && <ArrowUpRight size={9} />}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div className="flex justify-start">
            <div
              className="rounded-lg px-3 py-2 flex items-center gap-1"
              style={{ background: "var(--widget-border)" }}
            >
              {[0, 1, 2].map((d) => (
                <motion.span
                  key={d}
                  className="block w-1 h-1 rounded-full"
                  style={{ background: "var(--text-muted)" }}
                  animate={{ opacity: [0.2, 1, 0.2] }}
                  transition={{ duration: 1, repeat: Infinity, delay: d * 0.2 }}
                />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggested questions - hidden once the conversation starts */}
      {!hasUserMessage && (
        <div className="flex flex-wrap gap-1.5 mt-3 flex-none">
          {chat.suggestedQuestions.map((q, i) => (
            <button
              key={i}
              onClick={() => send(q)}
              className="font-mono text-[10px] px-2.5 py-1.5 rounded transition-colors text-left"
              style={{
                color: "var(--text-secondary)",
                border: "1px solid var(--widget-border)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <form
        className="flex items-center gap-2 mt-3 flex-none"
        onSubmit={(e) => {
          e.preventDefault()
          send(input)
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about Jeevan..."
          maxLength={500}
          aria-label="Your question"
          className="flex-1 rounded-lg px-3 py-2 text-[12px] outline-none"
          style={{
            background: "transparent",
            border: "1px solid var(--widget-border)",
            color: "var(--text-primary)",
          }}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          aria-label="Send"
          className="w-8 h-8 flex-none flex items-center justify-center rounded-lg transition-colors disabled:opacity-40"
          style={{
            color: "var(--text-secondary)",
            border: "1px solid var(--widget-border)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
        >
          <Send size={13} />
        </button>
      </form>
    </motion.section>
  )
}
