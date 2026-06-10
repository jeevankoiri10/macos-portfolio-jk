/**
 * projects.ts
 * ─────────────────────────────────────────────────────────────────────
 * All projects shown in the Projects window.
 * Split into two lists: `personal` (side projects) and `client`
 * (paid / contracted work). Both use the same ProjectItem shape.
 *
 *  - `tech`   → array of tags rendered beneath the description.
 *  - `stars`  → optional — shown next to the title if present
 *               (used here for Play Store ratings).
 *  - `status` → optional — rendered as a pill (e.g. "Paused").
 * ─────────────────────────────────────────────────────────────────────
 */

export interface ProjectItem {
  title: string
  description: string
  tech: string[]
  status?: string
  stars?: number
  link: string
}

export interface ProjectsConfig {
  personal: ProjectItem[]
  client: ProjectItem[]
}

export const projects: ProjectsConfig = {
  personal: [
    {
      title: "CTEVT Plus",
      description:
        "Flutter production app with 5K+ downloads and a 4.3+ star rating on Google Play. Built completely from scratch — BLoC architecture, Firebase backend, OAuth 2.0, admin panel.",
      tech: ["Flutter", "BLoC", "Firebase", "Dart"],
      stars: 4.3,
      status: "5K+ downloads",
      link: "https://play.google.com/store/apps/details?id=com.one.ctevt_plus",
    },
    {
      title: "Agriculture Loksewa",
      description:
        "Flutter app for agriculture exam preparation, free for all students with a Firebase backend. Published on Google Play with 5K+ downloads and a 4.7 star rating.",
      tech: ["Flutter", "Firebase", "Dart"],
      stars: 4.7,
      status: "5K+ downloads",
      link: "https://play.google.com/store/apps/details?id=com.one.agriculture_loksewa",
    },
    {
      title: "Detection & Locating of Humans",
      description:
        "Complete hardware + AI + app system using thermal infrared cameras and YOLO. Real-time location detection via a Flutter app — built to help national parks detect poachers in darkness. Top 12, ICT Award 2023.",
      tech: ["Flutter", "Python", "YOLO", "Firebase", "Thermal Imaging"],
      status: "ICT Award Top 12",
      link: "https://youtu.be/eK8zrcieS8k",
    },
  ],

  client: [
    {
      title: "MyNewEarth",
      description:
        "Holistic wellness app on the App Store. Built frontend UI with Nylo (Flutter), CRUD operations with Firebase, and RESTful API integration with a Django backend.",
      tech: ["Flutter", "Nylo", "Firebase", "Django", "REST APIs"],
      status: "App Store",
      link: "https://apps.apple.com/us/app/mynewearth/id6447554498",
    },
    {
      title: "San Trekking",
      description:
        "Trekking company website built with Next.js — fully designed and developed using Claude Code. Live on Vercel.",
      tech: ["Next.js", "React", "Claude Code"],
      link: "https://san-trekking.vercel.app",
    },
  ],
}

/** Résumé-only condensed project highlights (short names + long descriptions). */
export interface ResumeProjectItem {
  name: string
  desc: string
}

export const resumeProjects: ResumeProjectItem[] = [
  {
    name: "CTEVT Plus",
    desc: "Co-founded and shipped a Flutter exam-prep app from scratch — BLoC architecture, Firebase backend, OAuth 2.0, admin panel. 5K+ downloads, 4.3+ stars on Google Play.",
  },
  {
    name: "Agriculture Loksewa",
    desc: "Flutter app for agriculture Loksewa exam preparation, free for all students. 5K+ downloads and a 4.7 star rating on Google Play.",
  },
  {
    name: "Detection & Locating of Humans",
    desc: "Thermal-infrared + YOLO detection system with a Flutter app for real-time alerts, designed to detect poachers in darkness. Top 12 Innovation, ICT Award 2023.",
  },
  {
    name: "San Trekking",
    desc: "Modern, responsive trekking company website built with Next.js and Claude Code, deployed on Vercel.",
  },
]
