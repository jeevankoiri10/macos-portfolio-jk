/**
 * views.ts
 * ─────────────────────────────────────────────────────────────
 * Shared visit-counter client used by MenuBar and VisitorWidget.
 *
 * Counting rules:
 *  - One POST (increment) per browser session, guarded by
 *    sessionStorage — refreshes and widget remounts don't inflate
 *    the count.
 *  - Everything else is a read-only GET.
 *  - The in-flight promise is memoized per page load, so the two
 *    components share one network call and show the same number.
 * ─────────────────────────────────────────────────────────────
 */

const SESSION_KEY = "portfolio-visit-counted"

let viewsPromise: Promise<number | null> | null = null

export function getViews(): Promise<number | null> {
  if (!viewsPromise) {
    let counted = true
    try {
      counted = sessionStorage.getItem(SESSION_KEY) !== null
      sessionStorage.setItem(SESSION_KEY, "1")
    } catch {
      // sessionStorage unavailable (privacy mode) — fall back to read-only.
    }
    viewsPromise = fetch("/api/views", { method: counted ? "GET" : "POST" })
      .then((r) => r.json())
      .then((d) => (typeof d.count === "number" ? d.count : null))
      .catch(() => null)
  }
  return viewsPromise
}
