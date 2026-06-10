"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight, BadgeCheck, Expand, Star, X } from "lucide-react"
// Metrics, certifications, and testimonial images live in /config/achievements.ts.
import { metrics, certifications, gallery, reviews, type GalleryItem } from "@/config/achievements"

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating)
  return (
    <span className="flex items-center gap-0.5" style={{ color: "var(--accent)" }}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={10} className={i < full ? "fill-current" : "opacity-30"} />
      ))}
      <span className="font-mono text-[10px] ml-1" style={{ color: "var(--text-faint)" }}>
        {rating}
      </span>
    </span>
  )
}

export default function Achievements({ compact = false }: { compact?: boolean }) {
  const [viewer, setViewer] = useState<GalleryItem | null>(null)

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={compact ? "px-6 py-6" : "py-20 px-6"}
    >
      <p
        className="font-mono text-[10px] uppercase tracking-[0.14em] mb-5"
        style={{ color: "var(--text-muted)" }}
      >
        Achievements
      </p>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-2 mb-8">
        {metrics.map((m, i) => (
          <motion.div
            key={i}
            className="rounded-lg px-3 py-3 text-center"
            style={{ border: "1px solid var(--widget-border)" }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <p className="text-[17px] font-semibold text-white leading-tight">{m.value}</p>
            <p className="font-mono text-[9px] uppercase tracking-[0.08em] mt-1" style={{ color: "var(--text-faint)" }}>
              {m.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Testimonial / letter gallery — click to open the image viewer */}
      <p
        className="font-mono text-[10px] uppercase tracking-[0.1em] mb-3"
        style={{ color: "var(--text-faint)" }}
      >
        Testimonials & letters
      </p>
      <div className="grid grid-cols-2 gap-2 mb-8">
        {gallery.map((g, i) => (
          <button
            key={i}
            onClick={() => setViewer(g)}
            className="group relative rounded-lg overflow-hidden text-left"
            style={{ border: "1px solid var(--widget-border)" }}
            aria-label={`View ${g.platform} from ${g.name}`}
          >
            <div className="relative h-28 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={g.image}
                alt={`${g.platform} - ${g.name}`}
                className="w-full h-full object-cover object-top transition-transform group-hover:scale-[1.03]"
              />
              <span
                className="absolute top-2 right-2 w-6 h-6 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: "rgba(0,0,0,0.55)", color: "white" }}
              >
                <Expand size={11} />
              </span>
            </div>
            <div className="px-3 py-2.5">
              <p className="text-[12px] font-semibold text-white truncate">{g.name}</p>
              <p className="text-[10px] truncate" style={{ color: "var(--text-secondary)" }}>{g.role}</p>
              <p className="font-mono text-[9px] uppercase tracking-[0.08em] mt-1" style={{ color: "var(--text-faint)" }}>
                {g.platform}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Play Store reviews */}
      <p
        className="font-mono text-[10px] uppercase tracking-[0.1em] mb-3"
        style={{ color: "var(--text-faint)" }}
      >
        From the stores
      </p>
      <div className="space-y-2 mb-8">
        {reviews.map((r, i) => (
          <a
            key={i}
            href={r.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block rounded-lg px-4 py-3"
            style={{ border: "1px solid var(--widget-border)" }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[12px] font-semibold text-white">
                {r.name} · {r.role}
              </span>
              <Stars rating={r.rating} />
            </div>
            <p className="text-[11px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {r.text}
            </p>
            <p className="font-mono text-[9px] uppercase tracking-[0.08em] mt-2 flex items-center gap-1" style={{ color: "var(--text-faint)" }}>
              {r.platform}
              <ArrowUpRight size={9} className="opacity-0 group-hover:opacity-60 transition-opacity" />
            </p>
          </a>
        ))}
      </div>

      {/* Certifications */}
      <p
        className="font-mono text-[10px] uppercase tracking-[0.1em] mb-3"
        style={{ color: "var(--text-faint)" }}
      >
        Certifications
      </p>
      <div>
        {certifications.map((c, i) => {
          const row = (
            <>
              <div className="flex items-baseline gap-2 min-w-0">
                <BadgeCheck size={12} className="flex-none self-center" style={{ color: "var(--accent)" }} />
                <span className="text-[13px] font-medium truncate" style={{ color: "rgba(255,255,255,0.75)" }}>
                  {c.title}
                </span>
              </div>
              <span className="font-mono text-[10px] flex-none text-right" style={{ color: "var(--text-faint)" }}>
                {c.issuer}
              </span>
            </>
          )
          const rowStyle = {
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            borderTop: i === 0 ? "1px solid rgba(255,255,255,0.06)" : undefined,
          }
          return c.link ? (
            <a
              key={i}
              href={c.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between gap-4 py-2 hover:opacity-80 transition-opacity"
              style={rowStyle}
            >
              {row}
            </a>
          ) : (
            <div key={i} className="flex items-center justify-between gap-4 py-2" style={rowStyle}>
              {row}
            </div>
          )
        })}
      </div>

      {/* Image viewer overlay */}
      <AnimatePresence>
        {viewer && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-6"
            style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setViewer(null)}
          >
            <motion.div
              className="relative max-w-2xl w-full rounded-lg overflow-hidden"
              style={{ background: "var(--widget-bg)", border: "1px solid var(--widget-border)" }}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="flex items-center justify-between px-4 py-2.5"
                style={{ borderBottom: "1px solid var(--separator)" }}
              >
                <div className="min-w-0">
                  <p className="text-[12px] font-semibold text-white truncate">
                    {viewer.name} · {viewer.role}
                  </p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.08em]" style={{ color: "var(--text-faint)" }}>
                    {viewer.platform}
                  </p>
                </div>
                <button
                  onClick={() => setViewer(null)}
                  className="w-7 h-7 flex-none flex items-center justify-center rounded-md transition-colors"
                  style={{ color: "var(--text-secondary)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                  aria-label="Close"
                >
                  <X size={15} />
                </button>
              </div>
              <div className="max-h-[70vh] overflow-y-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={viewer.image} alt={`${viewer.platform} - ${viewer.name}`} className="w-full h-auto" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  )
}
