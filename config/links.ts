/**
 * links.ts
 * ─────────────────────────────────────────────────────────────────────
 * Curated external links shown in the LinksWidget on the desktop.
 * Each entry is an outbound link with a short tag used for display
 * only. Used here for Jeevan's profiles across the web.
 * ─────────────────────────────────────────────────────────────────────
 */

export interface LinkItem {
  title: string
  author: string
  url: string
  /** Freeform short label displayed under the author (e.g. "rust"). */
  tag: string
}

export const links: LinkItem[] = [
  { title: "Hire me on Upwork",      author: "Upwork",     url: "https://www.upwork.com/freelancers/~01ba229c2bc9c90602", tag: "freelance" },
  { title: "LinkedIn",               author: "Jeevan Koiri", url: "https://www.linkedin.com/in/jeevankoiri/",             tag: "network" },
  { title: "Writing on Medium",      author: "@jeevankoiri", url: "https://medium.com/@jeevankoiri",                      tag: "blog" },
  { title: "CTEVT Plus",             author: "Google Play",  url: "https://play.google.com/store/apps/details?id=com.one.ctevt_plus", tag: "app" },
  { title: "Agriculture Loksewa",    author: "Google Play",  url: "https://play.google.com/store/apps/details?id=com.one.agriculture_loksewa", tag: "app" },
  { title: "Tutoring - TeacherOn",   author: "TeacherOn",    url: "https://www.teacheron.com/tutor/dbew",                 tag: "teaching" },
  { title: "Tutoring - Prosikshya",  author: "Prosikshya",   url: "https://prosikshya.com/tutor/jeevan-koiri",            tag: "teaching" },
  { title: "Book a call",            author: "Cal.com",      url: "https://cal.com/jeevan-koiri-2hoh5s",                  tag: "meet" },
]
