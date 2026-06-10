/**
 * appdemos.ts
 * ─────────────────────────────────────────────────────────────────────
 * Data for the App Demo window — a phone-frame viewer for published
 * mobile apps. Each demo renders inside the phone screen either as:
 *
 *  - `embedUrl`     → a live web build loaded in an iframe, or
 *  - `screenshots`  → a swipeable strip of app screenshots.
 *
 * `storeLink` is shown as an outbound button under the phone.
 * ─────────────────────────────────────────────────────────────────────
 */

export interface AppDemoItem {
  title: string
  /** Short caption under the tabs, e.g. downloads + rating. */
  caption: string
  /** Live web build rendered in the phone screen. */
  embedUrl?: string
  /** Screenshot paths (in /public) — used when there is no embed. */
  screenshots?: string[]
  /** Outbound store / demo link. */
  storeLink: string
  storeLabel: string
}

export const appDemos: AppDemoItem[] = [
  {
    title: "Agriculture Loksewa",
    caption: "5K+ downloads · 4.7★ on Google Play — live demo, try it below",
    embedUrl: "https://agricultureloksewa-b109c.web.app/",
    storeLink: "https://play.google.com/store/apps/details?id=com.one.agriculture_loksewa",
    storeLabel: "Google Play",
  },
  {
    title: "CTEVT Plus",
    caption: "5K+ downloads · 4.3★ on Google Play — swipe the screenshots",
    screenshots: Array.from({ length: 16 }, (_, i) => `/portfolio/ctevt_${i + 1}.jpg`),
    storeLink: "https://play.google.com/store/apps/details?id=com.one.ctevt_plus",
    storeLabel: "Google Play",
  },
]
