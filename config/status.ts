/**
 * status.ts
 * ─────────────────────────────────────────────────────────────────────
 * Data for the StatusWidget shown in the desktop's top-right
 * corner. Flip `available` to false to render a muted indicator.
 *
 * The `currently` rows are free-form "label + value" pairs — add
 * or remove as many as you want.
 * ─────────────────────────────────────────────────────────────────────
 */

export interface StatusRow {
  /** Short label (5-10 chars reads best). */
  label: string
  value: string
}

export interface StatusConfig {
  available: boolean
  label: string
  currently: StatusRow[]
}

export const status: StatusConfig = {
  available: true,
  label: "Open to freelance work",
  currently: [
    { label: "Building", value: "Production Flutter apps for clients" },
    { label: "Writing",  value: "About viral apps, on Medium" },
    { label: "Teaching", value: "CS & Mathematics — 100+ students" },
  ],
}
