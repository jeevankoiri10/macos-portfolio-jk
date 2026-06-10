"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
// App demos (live embeds + screenshot strips) live in /config/appdemos.ts.
import { appDemos } from "@/config/appdemos"

export default function PhoneViewer({ compact = false }: { compact?: boolean }) {
  const [active, setActive] = useState(0)
  const demo = appDemos[active]

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
        App Demo
      </p>

      {/* Tabs */}
      <div
        className="flex gap-5 mb-3"
        style={{ borderBottom: "1px solid var(--separator)" }}
      >
        {appDemos.map((d, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="font-mono text-[10px] uppercase tracking-[0.1em] pb-2 transition-colors"
            style={{
              color: active === i ? "var(--text-primary)" : "var(--text-muted)",
              borderBottom: active === i ? "1px solid var(--accent)" : "1px solid transparent",
              marginBottom: -1,
            }}
          >
            {d.title}
          </button>
        ))}
      </div>

      <p className="font-mono text-[10px] mb-4" style={{ color: "var(--text-faint)" }}>
        {demo.caption}
      </p>

      {/* Phone frame */}
      <div className="flex justify-center">
        <div
          className="relative overflow-hidden flex-none"
          style={{
            width: 270,
            height: 552,
            borderRadius: 36,
            border: "6px solid rgba(255,255,255,0.12)",
            background: "#000",
            boxShadow: "0 18px 50px rgba(0,0,0,0.5)",
          }}
        >
          {/* Notch */}
          <div
            className="absolute top-2 left-1/2 -translate-x-1/2 z-10"
            style={{
              width: 86,
              height: 18,
              borderRadius: 10,
              background: "rgba(255,255,255,0.12)",
            }}
          />

          {demo.embedUrl ? (
            <iframe
              src={demo.embedUrl}
              title={demo.title}
              className="w-full h-full"
              style={{ border: 0 }}
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          ) : (
            <div className="w-full h-full overflow-x-auto flex snap-x snap-mandatory">
              {demo.screenshots?.map((src, i) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={i}
                  src={src}
                  alt={`${demo.title} screenshot ${i + 1}`}
                  className="h-full w-full object-cover flex-none snap-center"
                  loading={i < 2 ? "eager" : "lazy"}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Outbound links */}
      <div className="flex justify-center gap-2 mt-5">
        <a
          href={demo.storeLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] px-3 py-1.5 rounded transition-colors"
          style={{ color: "var(--text-secondary)", border: "1px solid var(--widget-border)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
        >
          {demo.storeLabel}
          <ArrowUpRight size={9} />
        </a>
        {demo.embedUrl && (
          <a
            href={demo.embedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] px-3 py-1.5 rounded transition-colors"
            style={{ color: "var(--text-secondary)", border: "1px solid var(--widget-border)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
          >
            Open full app
            <ArrowUpRight size={9} />
          </a>
        )}
      </div>
    </motion.section>
  )
}
