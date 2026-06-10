import { NextResponse } from "next/server"
// Knowledge prompt + rule-based fallback are built from /config data.
import { buildSystemPrompt, answerLocally } from "@/lib/chatContext"

export const dynamic = "force-dynamic"

interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

// Hybrid answering: Gemini free tier when GEMINI_API_KEY is set (get one
// free at https://aistudio.google.com/apikey - no credit card); otherwise,
// or on any API failure (e.g. quota), the rule-based local answer is used,
// so the chat never breaks and never returns a 500.
export async function POST(req: Request) {
  let messages: ChatMessage[]
  try {
    const body = await req.json()
    messages = body.messages
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 })
  }

  if (
    !Array.isArray(messages) ||
    messages.length === 0 ||
    messages.some(
      (m) =>
        !m ||
        (m.role !== "user" && m.role !== "assistant") ||
        typeof m.content !== "string" ||
        m.content.length === 0 ||
        m.content.length > 1000
    ) ||
    messages[messages.length - 1].role !== "user"
  ) {
    return NextResponse.json({ error: "invalid messages" }, { status: 400 })
  }

  // Keep the conversation short - this bounds token use on the free tier.
  const history = messages.slice(-12)
  const lastUserMessage = history[history.length - 1].content

  const apiKey = process.env.GEMINI_API_KEY
  if (apiKey) {
    const model = process.env.GEMINI_MODEL || "gemini-2.5-flash"
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
          body: JSON.stringify({
            systemInstruction: { parts: [{ text: buildSystemPrompt() }] },
            contents: history.map((m) => ({
              role: m.role === "assistant" ? "model" : "user",
              parts: [{ text: m.content }],
            })),
            generationConfig: { maxOutputTokens: 400, temperature: 0.7 },
          }),
        }
      )
      if (res.ok) {
        const data = await res.json()
        const reply = data?.candidates?.[0]?.content?.parts
          ?.map((p: { text?: string }) => p.text ?? "")
          .join("")
          .trim()
        if (reply) {
          return NextResponse.json({ reply, source: "ai" })
        }
      }
      // Non-OK (quota, bad key) or empty reply falls through to local.
    } catch {
      // Network error falls through to local.
    }
  }

  const local = answerLocally(lastUserMessage)
  return NextResponse.json({ reply: local.reply, actions: local.actions, source: "local" })
}
