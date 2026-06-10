/**
 * siteConfig.ts
 * ─────────────────────────────────────────────────────────────────────
 * Identity, social profiles, contact details, and page metadata.
 *
 * 👉 This is the FIRST file to edit when forking the template.
 * Everything else (projects, experience, skills, blogs) lives in
 * its own file inside /config so the data stays easy to maintain.
 * ─────────────────────────────────────────────────────────────────────
 */

// ── Types ──────────────────────────────────────────────────────────────────

export interface Personal {
  firstName: string
  lastName: string
  fullName: string
  /** Two-letter badge shown in the mobile status bar (e.g. "JD"). */
  initials: string
  /** Short role shown under your name in the Hero (e.g. "Frontend Engineer"). */
  role: string
  /** Longer title shown on the résumé header. */
  shortRole: string
  /** One-paragraph bio shown in the Hero. */
  tagline: string
  /** "City, Country" - displayed in Hero footer and résumé header. */
  location: string
  age: number | string
  /** Path (in /public) to your avatar image. */
  avatar: string
  /** Handle shown next to the avatar (no @). */
  username: string
}

export interface Social {
  github: string
  twitter: string
  /** Medium, Hashnode, personal blog, etc. */
  blog: string
  /** Bare GitHub username used in labels + API calls. */
  githubUsername: string
  /** Twitter/X handle, no @. */
  twitterHandle: string
}

export interface ContactRow {
  icon: "mail" | "calendar" | "twitter" | "github"
  href: string
  label: string
  /** Short monospaced value shown on the right of each row. */
  mono: string
}

export interface Contact {
  email: string
  calendar: string
  heading: string
  subheading: string
  rows: ContactRow[]
}

export interface Seo {
  title: string
  description: string
}

export interface Features {
  /** If true, the arrow-arrow-b-a Konami code triggers an easter egg overlay. */
  konami: boolean
}

export interface SiteConfig {
  personal: Personal
  social: Social
  contact: Contact
  seo: Seo
  /** URL to an external résumé (Notion page, Google Doc, hosted PDF). */
  resumeLink: string
  features: Features
}

// ── EDIT BELOW ──────────────────────────────────────────────────────────────

export const siteConfig: SiteConfig = {
  personal: {
    firstName: "Jeevan",
    lastName: "Koiri",
    fullName: "Jeevan Koiri",
    initials: "JK",
    role: "Flutter Developer",
    shortRole: "Flutter & Full-Stack Developer",
    tagline:
      "Flutter Developer with 3 published apps on Google Play and the App Store - 5K+ downloads and 4.3+ star ratings. From ideation to store deployment I handle the full app lifecycle, with full-stack skills in Next.js, Django, and Python, plus experience integrating AI/ML into mobile apps.",
    location: "Kathmandu, Nepal",
    age: "3+ yrs shipping",
    avatar: "/userjk.png",
    username: "jeevankoiri10",
  },

  social: {
    github: "https://github.com/jeevankoiri10",
    twitter: "https://x.com/koiri_jeevan",
    blog: "https://medium.com/@jeevankoiri",
    githubUsername: "jeevankoiri10",
    twitterHandle: "koiri_jeevan",
  },

  contact: {
    email: "jeevankoirima@gmail.com",
    calendar: "https://cal.com/jeevan-koiri-2hoh5s",
    heading: "Let's Work Together",
    subheading: "Have a project in mind? Open to freelance work, collaborations, or just a conversation.",
    rows: [
      { icon: "mail",     href: "mailto:jeevankoirima@gmail.com",        label: "Email",           mono: "jeevankoirima@gmail.com" },
      { icon: "calendar", href: "https://cal.com/jeevan-koiri-2hoh5s",   label: "Schedule a call", mono: "cal.com/jeevan-koiri" },
      { icon: "twitter",  href: "https://x.com/koiri_jeevan",            label: "X / Twitter",     mono: "@koiri_jeevan" },
      { icon: "github",   href: "https://github.com/jeevankoiri10",      label: "GitHub",          mono: "jeevankoiri10" },
    ],
  },

  seo: {
    title: "Jeevan Koiri | Flutter Developer",
    description:
      "Portfolio of Jeevan Koiri - Flutter Developer with 3 published apps, 5K+ downloads, and full-stack + AI/ML experience.",
  },

  resumeLink: "/Jeevan_Koiri_CV.pdf",

  features: {
    konami: false,
  },
}
