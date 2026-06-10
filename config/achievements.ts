/**
 * achievements.ts
 * ─────────────────────────────────────────────────────────────────────
 * Data for the Achievements window:
 *
 *  - `metrics`        → headline numbers shown as a grid at the top.
 *  - `certifications` → verified credentials (linked when possible).
 *  - `gallery`        → testimonial / letter / certificate images,
 *                       click one to open the built-in image viewer.
 *  - `reviews`        → text testimonials (e.g. Play Store ratings).
 * ─────────────────────────────────────────────────────────────────────
 */

export interface MetricItem {
  value: string
  label: string
}

export interface CertificationItem {
  title: string
  issuer: string
  link?: string
}

export interface GalleryItem {
  name: string
  role: string
  /** Where the proof comes from, e.g. "LinkedIn", "Certificate". */
  platform: string
  /** Path (in /public) to the image opened in the viewer. */
  image: string
}

export interface ReviewItem {
  name: string
  role: string
  platform: string
  rating: number
  text: string
  link: string
}

export const metrics: MetricItem[] = [
  { value: "3",      label: "Published Apps" },
  { value: "5,000+", label: "App Downloads" },
  { value: "4.3+",   label: "Play Store Rating" },
  { value: "10+",    label: "Projects Shipped" },
  { value: "3+",     label: "Years Building Apps" },
  { value: "100%",   label: "Client Satisfaction" },
]

export const certifications: CertificationItem[] = [
  {
    title: "AWS Academy Data Engineering",
    issuer: "Amazon Web Services",
    link: "https://www.credly.com/badges/6253f3ca-4bb5-420f-a84c-6bfc100027c6/",
  },
  {
    title: "CS50's Introduction to Computer Science",
    issuer: "Harvard University (edX)",
    link: "https://courses.edx.org/certificates/777c561a64ad441d8f57eb21c3fb129b",
  },
  {
    title: "Samsung's Artificial Intelligence",
    issuer: "Samsung",
    link: "https://www.linkedin.com/in/jeevankoiri/details/certifications/1718942288355/single-media-viewer/?profileId=ACoAADICKe0B95ithqNSb2pZ8f1eqySiHAwwljQ",
  },
  {
    title: "Understanding Research Methods",
    issuer: "Coursera",
    link: "https://www.coursera.org/account/accomplishments/verify/C6JGHKQ2MEXE",
  },
  {
    title: "Power BI for Beginners",
    issuer: "Simplilearn",
    link: "https://www.simplilearn.com/skillup-certificate-landing?token=eyJjb3Vyc2VfaWQiOiIxNzIyIiwiY2VydGlmaWNhdGVfdXJsIjoiaHR0cHM6XC9cL2NlcnRpZmljYXRlcy5zaW1wbGljZG4ubmV0XC9zaGFyZVwvODM3MDQ4MV84NzEwNDgxMTc0NzgxOTg5MDM2NC5wbmciLCJ1c2VybmFtZSI6IkplZXZhbiBLb2lyaSJ9&utm_source=shared-certificate&utm_medium=lms&utm_campaign=shared-certificate-promotion",
  },
  {
    title: "DSA and Software Engineering Bootcamp",
    issuer: "Bootcamp",
  },
  {
    title: "Registered General Engineer",
    issuer: "Electronics, Communication & Information Engineering",
  },
]

export const gallery: GalleryItem[] = [
  {
    name: "Marko Kostich",
    role: "Principal Software Engineer",
    platform: "LinkedIn",
    image: "/testimonials/marko-linkedin.png",
  },
  {
    name: "Chris Christodoulidis",
    role: "Founder of MyNewEarth",
    platform: "Recommendation Letter",
    image: "/testimonials/mynewearth-ceo.png",
  },
  {
    name: "Subash Devkota",
    role: "CEO, EZ Online Solutions Pvt. Ltd.",
    platform: "Flutter Internship Letter",
    image: "/testimonials/ez-online-flutter.jpg",
  },
  {
    name: "TEDxIOE Pulchowk",
    role: "Video Lead — TEDxIOE Pulchowk 2024",
    platform: "Certificate",
    image: "/testimonials/tedx-ioe.jpg",
  },
]

export const reviews: ReviewItem[] = [
  {
    name: "5,000+ Users",
    role: "CTEVT Plus App",
    platform: "Google Play",
    rating: 4.3,
    text: "4.3+ star rating on Google Play with thousands of active users. The app has helped students across Nepal prepare for their exams effectively.",
    link: "https://play.google.com/store/apps/details?id=com.one.ctevt_plus",
  },
  {
    name: "5,000+ Users",
    role: "Agriculture Loksewa App",
    platform: "Google Play",
    rating: 4.7,
    text: "4.7 star rating on Google Play with 5K+ downloads. Helping agriculture students prepare for Loksewa exams with free access to study materials.",
    link: "https://play.google.com/store/apps/details?id=com.one.agriculture_loksewa",
  },
]
