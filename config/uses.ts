/**
 * uses.ts
 * ─────────────────────────────────────────────────────────────────────
 * Data for the /uses-style window. Group your tools by category;
 * each item has a name and an optional short note.
 *
 * Categories and counts are fully flexible - the UI iterates over
 * whatever you provide.
 * ─────────────────────────────────────────────────────────────────────
 */

export interface UseItem {
  name: string
  /** Optional short descriptor shown in the faint mono style. */
  note?: string
}

export interface UseGroup {
  category: string
  items: UseItem[]
}

export const uses: UseGroup[] = [
  {
    category: "Mobile",
    items: [
      { name: "Flutter", note: "daily driver" },
      { name: "Dart" },
      { name: "BLoC", note: "state management" },
      { name: "Firebase", note: "backend + auth" },
    ],
  },
  {
    category: "Editor & IDE",
    items: [
      { name: "VS Code" },
      { name: "Android Studio", note: "emulators + builds" },
      { name: "Figma", note: "UI work" },
    ],
  },
  {
    category: "AI tools",
    items: [
      { name: "Claude Code", note: "built San Trekking with it" },
      { name: "Codex" },
      { name: "YOLO + PyTorch", note: "computer vision" },
    ],
  },
  {
    category: "Web",
    items: [
      { name: "Next.js", note: "web" },
      { name: "React" },
      { name: "TypeScript" },
      { name: "Vercel", note: "deploy" },
    ],
  },
  {
    category: "Backend & data",
    items: [
      { name: "Django", note: "REST APIs" },
      { name: "Python" },
      { name: "Power BI", note: "dashboards" },
      { name: "Git" },
    ],
  },
]
