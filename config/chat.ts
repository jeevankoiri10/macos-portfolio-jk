/**
 * chat.ts
 * ─────────────────────────────────────────────────────────────────────
 * Content for the Chat window - the assistant that answers visitor
 * questions from the data in /config.
 *
 *  - `greeting`           → assistant's first message bubble.
 *  - `suggestedQuestions` → quick-tap chips shown before the first
 *                           user message.
 *  - `contactFallback`    → reply used when no answer is known.
 *
 * Answers come from /api/chat: Gemini (free API key, optional) with
 * an automatic rule-based fallback in lib/chatContext.ts.
 * ─────────────────────────────────────────────────────────────────────
 */

export interface ChatConfig {
  greeting: string
  suggestedQuestions: string[]
  contactFallback: string
}

export const chat: ChatConfig = {
  greeting:
    "Hi! I'm Jeevan's portfolio assistant. Ask me anything about his apps, experience, skills, or availability.",
  suggestedQuestions: [
    "What apps has he published?",
    "Is he available for freelance work?",
    "Tell me about his AI projects",
    "What is his tech stack?",
    "How can I contact him?",
  ],
  contactFallback:
    "I'm not sure about that one. The best way to find out is to ask Jeevan directly at jeevankoirima@gmail.com, or use the Contact window to schedule a call.",
}
