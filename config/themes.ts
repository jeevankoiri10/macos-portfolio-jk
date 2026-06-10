/**
 * themes.ts
 * ─────────────────────────────────────────────────────────────
 * Themes shown in the ThemeWidget swatch picker on the desktop.
 * Each theme is a pure CSS palette - no external image files. The
 * accent colour ringing the active swatch, the tiny preview
 * gradient, and the matching wallpaper are all driven from here.
 *
 * To add a theme:
 *   1. Append an entry below with a unique `key`.
 *   2. Add a `[data-theme="<key>"]` block to app/globals.css with
 *      the full set of --bg / --accent / --text tokens.
 *   3. Add a `[data-theme="<key>"] .album-wallpaper { ... }` block
 *      to globals.css for the blurred wallpaper layer.
 *
 * The "default" theme (`midnight`) has `gradient: null` - it's the
 * bare dark palette defined on `:root`.
 * ─────────────────────────────────────────────────────────────
 */

export type ThemeKey = "midnight" | "amber" | "ocean" | "forest"

export interface ThemeItem {
  key: ThemeKey
  /** Short display label under the swatch. */
  label: string
  /** Longer description shown in the header when a theme is active. */
  description: string
  /** Ring colour around the active swatch. */
  accentColor: string
  /** CSS background for the tiny preview swatch. `null` renders the default midnight sleeve. */
  gradient: string | null
}

export const themes: ThemeItem[] = [
  {
    key: "midnight",
    label: "Default",
    description: "Midnight",
    accentColor: "rgba(255,255,255,0.6)",
    gradient: null,
  },
  {
    key: "amber",
    label: "Amber",
    description: "Amber · violet night",
    accentColor: "rgba(255,175,65,0.9)",
    gradient: "linear-gradient(150deg, #0a0418 0%, #2a1550 45%, #c8741c 100%)",
  },
  {
    key: "ocean",
    label: "Ocean",
    description: "Ocean · deep blue",
    accentColor: "rgba(60,145,255,0.9)",
    gradient: "linear-gradient(150deg, #01060f 0%, #07203a 55%, #1a6fd4 100%)",
  },
  {
    key: "forest",
    label: "Forest",
    description: "Forest · deep green",
    accentColor: "rgba(55,205,120,0.9)",
    gradient: "linear-gradient(150deg, #001208 0%, #0a3d22 50%, #1fa45e 100%)",
  },
]
