/**
 * notes.ts
 * ─────────────────────────────────────────────────────────────────────
 * Short, informal journal-style notes rendered in the Notes
 * window. Paragraphs are separated by blank lines (\n\n) - single
 * newlines are preserved as line breaks.
 *
 * Sort order is as written - newest first is the convention.
 * ─────────────────────────────────────────────────────────────────────
 */

export interface NoteItem {
  /** Display date, e.g. "Mar 2026". */
  date: string
  /** Body text. Separate paragraphs with a blank line. */
  body: string
}

export const notes: NoteItem[] = [
  {
    date: "May 2026",
    body: `Been thinking a lot about what actually makes apps go viral - wrote it up on Medium ("How are viral apps made?").

The short version: distribution is a feature. Build it in from day one.`,
  },
  {
    date: "Dec 2025",
    body: `Wrapped up at CG Electronics. Dashboards tracking 35K+ service calls a month, automation that cut manual inventory entry by 40%, and on the side at DroneWorx - an autonomous weedcutter driven from a Next.js app talking to ROS.

Strange and fun mix of data, web, and robots.`,
  },
  {
    date: "Mar 2025",
    body: `MyNewEarth shipped on the App Store. Remote work across time zones (Nepal ↔ Cyprus) taught me to over-communicate: a good written update beats three meetings.`,
  },
  {
    date: "Nov 2024",
    body: `CTEVT Plus crossed 5K downloads with a 4.3+ rating. We started it because CTEVT students had no centralized app for exam prep - built it from scratch with Flutter and Firebase, and students across Nepal use it daily now.

Co-founding something and watching real users depend on it is a different kind of motivation.`,
  },
  {
    date: "2023",
    body: `Our final-year project - detecting and locating humans with thermal infrared cameras and YOLO, with a Flutter app for real-time alerts - made Top 12 at the ICT Award 2023. Designed for national parks to catch poachers in total darkness.

Hardware + AI + app in one system. Hardest and most rewarding thing I built at Pulchowk.`,
  },
]
