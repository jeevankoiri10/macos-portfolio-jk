/**
 * experience.ts
 * ─────────────────────────────────────────────────────────────────────
 *  - `experience`        → full cards shown in the Experience window
 *                          (click one to open a modal with achievements + links).
 *  - `resumeExperience`  → condensed bullets shown on the Résumé window.
 *  - `education`         → single degree entry for the Résumé.
 *  - `teaching`          → free-form bullets for the Teaching section.
 *
 * The two experience lists are separate on purpose: the main site shows
 * every role, while the résumé groups multiple roles into summaries.
 * ─────────────────────────────────────────────────────────────────────
 */

export interface ExperienceItem {
  company: string
  role: string
  /** e.g. "Jun 2024 – Present" or "2023". */
  period: string
  /** One-line summary shown on the card. */
  description: string
  tech: string[]
  /** Bullet points shown in the modal. */
  achievements: string[]
  /** Optional related links shown at the bottom of the modal. */
  links?: { type: string; url: string; label: string }[]
}

export const experience: ExperienceItem[] = [
  {
    company: "CG Electronics Pvt. Ltd. + DroneWorx.ai",
    role: "Software Engineer",
    period: "Apr 2025 – Dec 2025",
    description: "Data dashboards, automation, and AI-powered tools across service operations and robotics.",
    tech: ["Power BI", "Python", "Selenium", "Next.js", "ROS", "Gazebo", "YOLO", "Streamlit"],
    achievements: [
      "Developed Power BI dashboards tracking 35K+ service calls monthly, reducing call resolution time by 20%.",
      "Built Python Selenium automation for 25,000+ inventory items, reducing manual entry by 40%.",
      "Built a Next.js app with ROS & Gazebo for an autonomous weedcutter vehicle (DroneWorx.ai, part-time).",
      "Developed a Streamlit app for concealed weapon detection using a YOLO model.",
    ],
  },
  {
    company: "MyNewEarth",
    role: "Frontend & AI Developer",
    period: "Nov 2024 – Mar 2025",
    description: "Remote role (Cyprus, Europe) building a holistic wellness app available on the App Store.",
    tech: ["Flutter", "Nylo", "Firebase", "Django", "Android Studio", "Git"],
    achievements: [
      "Helped build the MyNewEarth holistic wellness app, available on the App Store.",
      "Worked with the Nylo framework for UI and CRUD operations with the Rowy Firebase database.",
      "Integrated RESTful APIs from Django with Swagger documentation.",
    ],
    links: [
      { type: "website", url: "https://apps.apple.com/us/app/mynewearth/id6447554498", label: "App Store" },
    ],
  },
  {
    company: "CTEVT Plus, Kathmandu",
    role: "Co-founder & Mobile Application Developer",
    period: "Apr 2023 – Nov 2024",
    description: "Co-founded and shipped an exam-prep app to 5K+ downloads on Google Play.",
    tech: ["Flutter", "BLoC", "Firebase", "OAuth 2.0", "Dart"],
    achievements: [
      "Co-founded and deployed CTEVT Plus on the Play Store - 5K+ downloads, 4.3+ star rating.",
      "Designed, built, and released the app with a Firebase backend, OAuth 2.0, and an admin panel.",
      "Also built and deployed ktmacademy.com.",
    ],
    links: [
      { type: "website", url: "https://play.google.com/store/apps/details?id=com.one.ctevt_plus", label: "Google Play" },
    ],
  },
  {
    company: "EZ Online Solutions Pvt. Ltd., Kathmandu",
    role: "Flutter Engineer Intern",
    period: "Nov 2023 – Dec 2023",
    description: "Built mobile and web frontends to support hotel businesses in Nepal.",
    tech: ["Flutter", "Figma", "Git", "Android SDK", "APIs", "MVC"],
    achievements: [
      "Created frontends for a mobile application and website facilitating hotel businesses in Nepal.",
      "Worked with Flutter, Figma, Git, the Android SDK, APIs, and MVC architecture.",
    ],
  },
]

// ── Résumé-only condensed version ────────────────────────────────────

export interface ResumeExperienceItem {
  company: string
  role: string
  period: string
  /** Optional list of sub-companies (e.g. for a contractor umbrella). */
  subRoles?: string[]
  bullets: string[]
}

export const resumeExperience: ResumeExperienceItem[] = [
  {
    company: "CG Electronics Pvt. Ltd.",
    role: "Software Engineer",
    period: "Apr 2025 – Dec 2025",
    subRoles: ["DroneWorx.ai (part-time)"],
    bullets: [
      "Power BI dashboards tracking 35K+ service calls monthly - call resolution time down 20%.",
      "Python Selenium automation for 25,000+ inventory items - manual entry down 40%.",
      "Next.js + ROS/Gazebo app for an autonomous weedcutter; YOLO-based weapon-detection Streamlit app.",
    ],
  },
  {
    company: "MyNewEarth (Remote, Cyprus)",
    role: "Frontend & AI Developer",
    period: "Nov 2024 – Mar 2025",
    bullets: [
      "Built the MyNewEarth wellness app (App Store) with Nylo (Flutter) and Firebase.",
      "Integrated Django REST APIs with Swagger documentation.",
    ],
  },
  {
    company: "CTEVT Plus, Kathmandu",
    role: "Co-founder & Mobile App Developer",
    period: "Apr 2023 – Nov 2024",
    bullets: [
      "Shipped CTEVT Plus to 5K+ downloads and a 4.3+ rating - Firebase, OAuth 2.0, admin panel.",
      "Built and deployed ktmacademy.com.",
    ],
  },
  {
    company: "EZ Online Solutions Pvt. Ltd.",
    role: "Flutter Engineer Intern",
    period: "Nov 2023 – Dec 2023",
    bullets: [
      "Built mobile and web frontends for hotel businesses in Nepal.",
    ],
  },
]

// ── Education + Teaching ──────────────────────────────────────────────

export interface EducationItem {
  school: string
  degree: string
  period: string
}

export const education: EducationItem = {
  school: "Pulchowk Campus, IOE, Tribhuvan University",
  degree: "B.E. - Electronics, Communication & Information Engineering (76.27%)",
  period: "Dec 2019 – Mar 2024",
}

export const teaching: string[] = [
  "Taught 100+ students in Computer Science, Engineering Mathematics, and programming.",
  "Available for secondary, +2, and bachelor-level tutoring in Nepali, English, and Hindi.",
  "Tutor profiles on TeacherOn and Prosikshya.",
]
