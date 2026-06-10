/**
 * terminal.ts
 * ─────────────────────────────────────────────────────────────────────
 * Payloads for the interactive Terminal window. Each entry is the
 * content printed by a command or a virtual file. Lines are shown
 * verbatim — an empty string renders as a blank line.
 * ─────────────────────────────────────────────────────────────────────
 */

export interface TerminalConfig {
  /** Content of `cat about.txt`. */
  about: string[]
  /** Content of `cat skills.txt`. */
  skills: string[]
  /** Content of `cat experience.txt`. */
  experience: string[]
  /** Content of `cat contact.txt`. */
  contact: string[]
  /** Content of `cat resume.pdf`. */
  resume: string[]
  /** Output of `whoami`. */
  whoami: string[]
  /** Fake JSON returned by `curl github.com/<user>`. */
  githubJson: string
}

export const terminal: TerminalConfig = {
  about: [
    "Name:   Jeevan Koiri",
    "Base:   Kathmandu, Nepal",
    "Role:   Flutter Developer",
    "",
    "3 published apps on Google Play and the App Store.",
    "5K+ downloads, 4.3+ star ratings.",
    "From ideation to store deployment — full app lifecycle.",
  ],
  skills: [
    "Mobile:     Flutter · Dart · BLoC · Firebase",
    "Frontend:   Next.js · React · TypeScript",
    "Backend:    Django · Python · REST APIs",
    "AI/ML:      YOLO · PyTorch · Computer Vision",
    "Tools:      Git · Power BI · Figma · Claude Code",
  ],
  experience: [
    "CG Electronics + DroneWorx.ai   Apr 2025 – Dec 2025   Software Engineer",
    "MyNewEarth (Remote, Cyprus)     Nov 2024 – Mar 2025   Frontend & AI Developer",
    "CTEVT Plus, Kathmandu           Apr 2023 – Nov 2024   Co-founder & Mobile Dev",
    "EZ Online Solutions             Nov 2023 – Dec 2023   Flutter Intern",
  ],
  contact: [
    "email:    jeevankoirima@gmail.com",
    "phone:    +977 9807590455",
    "github:   github.com/jeevankoiri10",
    "twitter:  x.com/koiri_jeevan",
    "upwork:   upwork.com/freelancers/~01ba229c2bc9c90602",
    "cal:      cal.com/jeevan-koiri-2hoh5s",
  ],
  resume: [
    "Opening résumé…",
    "→ /Jeevan_Koiri_CV.pdf",
  ],
  whoami: [
    "Jeevan Koiri",
    "Flutter Developer · Kathmandu, Nepal",
    "",
    "I ship production apps — 3 published,",
    "5K+ downloads, 4.3+ star ratings.",
  ],
  githubJson: `{"login":"jeevankoiri10","name":"Jeevan Koiri","bio":"Flutter Developer — I ship production apps","location":"Nepal"}`,
}
