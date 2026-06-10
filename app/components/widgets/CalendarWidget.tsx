"use client"

import { useMemo, useState } from "react"
import { motion, useDragControls } from "framer-motion"
import { toBikramSambat, BS_MONTH_NAMES } from "@/lib/bikramSambat"

const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"]

type CalSystem = "AD" | "BS"

export default function CalendarWidget() {
  const dragControls = useDragControls()
  const [calSystem, setCalSystem] = useState<CalSystem>("AD")

  const { year, today, cells, monthName } = useMemo(() => {
    const now = new Date()

    if (calSystem === "BS") {
      const bs = toBikramSambat(now)
      // bs is null outside the lookup table range — fall through to AD then.
      if (bs) {
        // Weekday of Day 1 of the BS month = weekday of (today − (bs.day − 1)) in AD.
        const firstDow = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (bs.day - 1)).getDay()
        const cells = [
          ...Array(firstDow).fill(null),
          ...Array.from({ length: bs.daysInMonth }, (_, i) => i + 1),
        ]
        return { year: bs.year, today: bs.day, cells, monthName: BS_MONTH_NAMES[bs.month] }
      }
    }

    const year = now.getFullYear()
    const month = now.getMonth()
    const today = now.getDate()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const firstDow = new Date(year, month, 1).getDay()
    const cells = [
      ...Array(firstDow).fill(null),
      ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ]
    const monthName = now.toLocaleDateString("en-US", { month: "long" })
    return { year, today, cells, monthName }
  }, [calSystem])

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0}
      className="absolute select-none"
      style={{ top: 228, right: 24, zIndex: 5, width: 200 }}
    >
      <div className="widget-handle" onPointerDown={(e) => dragControls.start(e)}>
        <div style={{ width: 24, height: 2, borderRadius: 1, background: "rgba(255,255,255,0.12)" }} />
      </div>

      <div className="widget-body px-3 pt-3 pb-3">
        {/* AD / BS (Bikram Sambat) calendar-system toggle */}
        <div
          className="flex mb-2 p-0.5 rounded-md"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}
          role="tablist"
          aria-label="Calendar system"
        >
          {(["AD", "BS"] as CalSystem[]).map((sys) => (
            <button
              key={sys}
              type="button"
              role="tab"
              aria-selected={calSystem === sys}
              onClick={() => setCalSystem(sys)}
              className="flex-1 font-mono text-[9px] uppercase tracking-widest py-1 rounded transition-colors cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60"
              style={{
                background: calSystem === sys ? "rgba(255,255,255,0.1)" : "transparent",
                color: calSystem === sys ? "var(--text-primary)" : "var(--text-faint)",
                fontWeight: calSystem === sys ? 600 : 400,
              }}
            >
              {sys}
            </button>
          ))}
        </div>

        <div className="flex items-baseline justify-between mb-3">
          <p className="text-[12px] font-semibold" style={{ color: "var(--text-primary)" }}>
            {monthName}
          </p>
          <p className="font-mono text-[10px]" style={{ color: "var(--text-faint)" }}>
            {year}
          </p>
        </div>

        <div className="grid grid-cols-7 mb-1">
          {DAY_LABELS.map((d, i) => (
            <div
              key={i}
              className="text-center font-mono text-[9px] py-0.5"
              style={{ color: "var(--text-faint)" }}
            >
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-0.5">
          {cells.map((day, i) => (
            <div
              key={i}
              className="flex items-center justify-center font-mono text-[10px]"
              style={{
                height: 22,
                borderRadius: 4,
                background: day === today ? "var(--accent-subtle)" : "transparent",
                color: day === today
                  ? "var(--text-primary)"
                  : day
                  ? "var(--text-secondary)"
                  : "transparent",
                fontWeight: day === today ? 600 : 400,
                outline: day === today ? "1px solid var(--accent)" : "none",
                outlineOffset: -1,
              }}
            >
              {day ?? ""}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
