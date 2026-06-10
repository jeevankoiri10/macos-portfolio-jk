/**
 * skills.ts
 * ─────────────────────────────────────────────────────────────────────
 * Skills grouped by category. Keys become category labels on the
 * left; values become the chip list on the right.
 *
 * Add, remove, or rename categories freely — the Résumé section
 * iterates over Object.entries(skills), so the UI adapts.
 * ─────────────────────────────────────────────────────────────────────
 */

export type Skills = Record<string, string[]>

export const skills: Skills = {
  "Mobile":       ["Flutter", "Dart", "BLoC", "Firebase", "Android SDK"],
  "Frontend":     ["Next.js", "React", "TypeScript", "JavaScript"],
  "Backend":      ["Django", "Python", "REST APIs", "Firebase"],
  "AI / ML":      ["YOLO", "PyTorch", "Computer Vision", "NLP"],
  "Tools":        ["Git", "Power BI", "Figma", "Claude Code", "Codex"],
}
