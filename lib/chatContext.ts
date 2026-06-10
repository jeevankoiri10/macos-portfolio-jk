/**
 * chatContext.ts
 * ─────────────────────────────────────────────────────────────────────
 * Server-side helpers for the Chat window.
 *
 *  - `buildSystemPrompt()` → serializes the /config data into a
 *    compact plain-text knowledge document + instructions, used as
 *    the Gemini system prompt. The whole portfolio fits in one
 *    prompt, so no retrieval layer is needed.
 *
 *  - `answerLocally(question)` → rule-based fallback used when no
 *    GEMINI_API_KEY is set, the free quota is exhausted, or the API
 *    errors. Keyword buckets map to answers assembled from the same
 *    config data, so the chat always works - with or without AI.
 * ─────────────────────────────────────────────────────────────────────
 */

import { siteConfig } from "@/config/siteConfig"
import { experience, education, teaching } from "@/config/experience"
import { projects } from "@/config/projects"
import { skills } from "@/config/skills"
import { metrics, certifications, reviews } from "@/config/achievements"
import { uses } from "@/config/uses"
import { notes } from "@/config/notes"
import { links } from "@/config/links"
import { chat } from "@/config/chat"

const { personal, social, contact } = siteConfig

function section(title: string, body: string): string {
  return `## ${title}\n${body}`
}

export function buildSystemPrompt(): string {
  const allProjects = [
    ...projects.personal.map((p) => ({ ...p, kind: "personal" })),
    ...projects.client.map((p) => ({ ...p, kind: "client" })),
  ]

  const knowledge = [
    section(
      "Identity",
      [
        `Name: ${personal.fullName}`,
        `Role: ${personal.role} (${personal.shortRole})`,
        `Location: ${personal.location}`,
        `Bio: ${personal.tagline}`,
      ].join("\n")
    ),
    section(
      "Headline numbers",
      metrics.map((m) => `- ${m.value} ${m.label}`).join("\n")
    ),
    section(
      "Work experience",
      experience
        .map(
          (e) =>
            `- ${e.role} at ${e.company} (${e.period}). ${e.description} Key work: ${e.achievements.join(" ")} Stack: ${e.tech.join(", ")}.`
        )
        .join("\n")
    ),
    section(
      "Projects",
      allProjects
        .map(
          (p) =>
            `- ${p.title} (${p.kind}${p.status ? `, ${p.status}` : ""}${p.stars ? `, rated ${p.stars}` : ""}): ${p.description} Tech: ${p.tech.join(", ")}. Link: ${p.link}`
        )
        .join("\n")
    ),
    section(
      "Skills",
      Object.entries(skills)
        .map(([cat, list]) => `- ${cat}: ${list.join(", ")}`)
        .join("\n")
    ),
    section(
      "Education",
      `${education.degree}, ${education.school} (${education.period}).`
    ),
    section("Teaching / tutoring", teaching.map((t) => `- ${t}`).join("\n")),
    section(
      "Certifications",
      certifications.map((c) => `- ${c.title} (${c.issuer})`).join("\n")
    ),
    section(
      "Store reviews",
      reviews.map((r) => `- ${r.role}: ${r.rating} stars on ${r.platform}. ${r.text}`).join("\n")
    ),
    section(
      "Tools he uses",
      uses
        .map((g) => `- ${g.category}: ${g.items.map((i) => i.name).join(", ")}`)
        .join("\n")
    ),
    section(
      "Recent notes (journal)",
      notes.map((n) => `- ${n.date}: ${n.body.replace(/\s+/g, " ")}`).join("\n")
    ),
    section(
      "Links",
      [
        `- Email: ${contact.email}`,
        `- Schedule a call: ${contact.calendar}`,
        `- GitHub: ${social.github}`,
        `- X/Twitter: ${social.twitter}`,
        `- Blog (Medium): ${social.blog}`,
        ...links.map((l) => `- ${l.title}: ${l.url}`),
      ].join("\n")
    ),
  ].join("\n\n")

  return [
    `You are the friendly assistant on ${personal.fullName}'s portfolio website. Visitors ask you questions about him.`,
    `Answer ONLY from the facts below. Keep replies short - 2 to 4 sentences, plain text, no markdown headings or bold.`,
    `When listing several items (roles, apps, skills), put each item on its own line starting with "- " instead of one long sentence.`,
    `If the answer is not in the facts, say you are not sure and suggest emailing ${contact.email} or scheduling a call at ${contact.calendar}.`,
    `Never invent projects, employers, dates, or numbers. Refer to him as Jeevan.`,
    ``,
    `# FACTS`,
    ``,
    knowledge,
  ].join("\n")
}

// ── Rule-based fallback ──────────────────────────────────────────────

/** Interactive button rendered under an assistant reply. Either opens a
 *  desktop window (`window` = WindowId, scrolls to the section on mobile)
 *  or an external link (`url`). */
export interface ChatAction {
  label: string
  window?: string
  url?: string
}

export interface LocalAnswer {
  reply: string
  actions: ChatAction[]
}

interface Rule {
  keywords: string[]
  answer: () => string
  actions?: ChatAction[]
}

const rules: Rule[] = [
  {
    keywords: ["hi", "hello", "hey", "namaste"],
    answer: () =>
      `Hello! I'm an assistant and I'm helping you to navigate Jeevan Koiri's portfolio. Ask me about his apps, work experience, skills, or how to get in touch with him.`,
    actions: [
      { label: "Open Projects", window: "projects" },
      { label: "Open Experience", window: "experience" },
      { label: "Open Contact", window: "contact" },
    ],
  },
  // Specific intents first - the experience rule below matches the common
  // word "work", so hire/contact must take priority over it.
  {
    keywords: ["hire", "freelance", "available", "availability", "upwork", "rate"],
    answer: () =>
      [
        `Yes - Jeevan is open to freelance work. You can:`,
        ``,
        `- Email: ${contact.email}`,
        `- Schedule a call: ${contact.calendar}`,
        `- Hire on Upwork`,
      ].join("\n"),
    actions: [
      { label: "Email Jeevan", url: `mailto:${contact.email}` },
      { label: "Schedule a call", url: contact.calendar },
      { label: "Hire on Upwork", url: links.find((l) => l.tag === "freelance")?.url ?? "" },
    ],
  },
  {
    keywords: ["contact", "email", "reach", "call", "phone", "touch"],
    answer: () =>
      [
        `You can reach Jeevan at:`,
        ``,
        `- Email: ${contact.email}`,
        `- Schedule a call: ${contact.calendar}`,
        ``,
        `The Contact window has all his links.`,
      ].join("\n"),
    actions: [
      { label: "Email Jeevan", url: `mailto:${contact.email}` },
      { label: "Schedule a call", url: contact.calendar },
      { label: "Open Contact", window: "contact" },
    ],
  },
  {
    keywords: ["app", "apps", "project", "built", "build", "publish", "portfolio", "ctevt", "loksewa", "mynewearth", "trekking"],
    answer: () =>
      [
        `Jeevan has 3 published apps with 5,000+ downloads:`,
        ``,
        `- CTEVT Plus - 4.3 stars on Google Play`,
        `- Agriculture Loksewa - 4.7 stars on Google Play`,
        `- MyNewEarth - on the App Store`,
        ``,
        `Other projects include a thermal-imaging human detection system (ICT Award Top 12) and the San Trekking website. Open the Projects or App Demo window to explore them.`,
      ].join("\n"),
    actions: [
      { label: "Open Projects", window: "projects" },
      { label: "Try the App Demo", window: "appdemo" },
    ],
  },
  {
    keywords: ["experience", "work", "job", "jobs", "career", "company", "intern"],
    answer: () =>
      [
        `Jeevan's work experience:`,
        ``,
        ...experience.map((e) => `- ${e.role}\n  ${e.company} (${e.period})`),
        ``,
        `Open the Experience window for details on each role.`,
      ].join("\n"),
    actions: [{ label: "Open Experience", window: "experience" }],
  },
  {
    keywords: ["skill", "stack", "tech", "technology", "language", "framework", "flutter"],
    answer: () =>
      [
        `Jeevan's tech stack:`,
        ``,
        ...Object.entries(skills).map(([cat, list]) => `- ${cat}: ${list.join(", ")}`),
      ].join("\n"),
    actions: [{ label: "Open Résumé", window: "resume" }],
  },
  {
    keywords: ["ai", "ml", "yolo", "machine learning", "computer vision", "detection"],
    answer: () =>
      `Jeevan integrates AI/ML into real products: a YOLO-based human detection system using thermal infrared cameras (Top 12, ICT Award 2023), a concealed weapon detection app, and AI features in mobile apps using PyTorch and computer vision.`,
    actions: [{ label: "Open Projects", window: "projects" }],
  },
  {
    keywords: ["education", "study", "degree", "university", "college", "pulchowk"],
    answer: () =>
      `${education.degree} from ${education.school} (${education.period}).`,
    actions: [{ label: "Open Résumé", window: "resume" }],
  },
  {
    keywords: ["achievement", "award", "certification", "certificate", "won", "winner"],
    answer: () =>
      [
        `Highlights:`,
        ``,
        `- Top 12 Innovation, ICT Award 2023`,
        `- IEEE Video Challenge winner`,
        `- 3 published apps with 5K+ downloads`,
        ``,
        `Certifications include:`,
        ``,
        ...certifications.slice(0, 4).map((c) => `- ${c.title} (${c.issuer})`),
        ``,
        `See the Achievements window for the full list.`,
      ].join("\n"),
    actions: [{ label: "Open Achievements", window: "achievements" }],
  },
  {
    keywords: ["blog", "write", "writing", "medium", "article"],
    answer: () =>
      `Jeevan writes on Medium (${social.blog}) - recent posts cover how viral apps are made and Flutter development with Nylo. The Blogs window has summaries.`,
    actions: [
      { label: "Open Blogs", window: "blogs" },
      { label: "Read on Medium", url: social.blog },
    ],
  },
  {
    keywords: ["teach", "tutor", "tutoring", "math", "student"],
    answer: () => teaching.map((t) => `- ${t}`).join("\n"),
    actions: [
      { label: "TeacherOn", url: links.find((l) => l.author === "TeacherOn")?.url ?? "" },
      { label: "Prosikshya", url: links.find((l) => l.author === "Prosikshya")?.url ?? "" },
    ],
  },
  {
    keywords: ["where", "location", "from", "nepal", "kathmandu"],
    answer: () => `Jeevan is based in ${personal.location}.`,
  },
]

export function answerLocally(question: string): LocalAnswer {
  const q = question.toLowerCase()
  // Whole-word matching - substring matching makes "hi" match "his"/"him".
  // Keywords of 4+ chars match as prefixes ("work" → "working"); shorter
  // ones must match exactly, so list plurals explicitly (e.g. "apps").
  const words = q.split(/[^a-z0-9]+/).filter(Boolean)
  const matchesWord = (k: string) =>
    k.length >= 4 ? words.some((w) => w.startsWith(k)) : words.includes(k)
  const matchesKeyword = (k: string) => (k.includes(" ") ? q.includes(k) : matchesWord(k))

  for (const rule of rules) {
    if (rule.keywords.some(matchesKeyword)) {
      return { reply: rule.answer(), actions: rule.actions ?? [] }
    }
  }
  return {
    reply: chat.contactFallback,
    actions: [
      { label: "Email Jeevan", url: `mailto:${contact.email}` },
      { label: "Open Contact", window: "contact" },
    ],
  }
}
