"use client"

import { useMemo, useState } from "react"
import { motion, useDragControls } from "framer-motion"
import { ChevronLeft, ChevronRight, Target } from "lucide-react"
import { toBikramSambat, bsDaysInMonth, bsMonthStartAD, BS_MONTH_NAMES, BS_EPOCH_YEAR } from "@/lib/bikramSambat"

const DAY_LABELS = ["S", "M", "T", "W", "T", "F", "S"]

export default function CalendarWidget() {
  const dragControls = useDragControls()
  const [isBS, setIsBS] = useState(false)
  // Months relative to the current month — shared by both systems,
  // since AD and BS months advance in lockstep.
  const [monthOffset, setMonthOffset] = useState(0)

  const { year, today, cells, monthName } = useMemo(() => {
    const now = new Date()

    if (isBS) {
      const bsToday = toBikramSambat(now)
      // Falls through to AD when the date leaves the lookup-table range.
      if (bsToday) {
        const total = (bsToday.year - BS_EPOCH_YEAR) * 12 + bsToday.month + monthOffset
        const y = BS_EPOCH_YEAR + Math.floor(total / 12)
        const m = ((total % 12) + 12) % 12
        const daysInMonth = bsDaysInMonth(y, m)
        const start = bsMonthStartAD(y, m)
        if (daysInMonth && start) {
          const cells = [
            ...Array(start.getUTCDay()).fill(null),
            ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
          ]
          return {
            year: y,
            today: monthOffset === 0 ? bsToday.day : null,
            cells,
            monthName: BS_MONTH_NAMES[m],
          }
        }
      }
    }

    const viewed = new Date(now.getFullYear(), now.getMonth() + monthOffset, 1)
    const year = viewed.getFullYear()
    const month = viewed.getMonth()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const cells = [
      ...Array(viewed.getDay()).fill(null),
      ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ]
    return {
      year,
      today: monthOffset === 0 ? now.getDate() : null,
      cells,
      monthName: viewed.toLocaleDateString("en-US", { month: "long" }),
    }
  }, [isBS, monthOffset])

  const navBtnStyle: React.CSSProperties = {
    width: 18,
    height: 18,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    color: "var(--text-faint)",
    background: "transparent",
  }

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
        {/* Header: ‹ month [AD/BS switch] year › */}
        <div className="flex items-center justify-between mb-3 gap-1">
          <button
            type="button"
            aria-label="Previous month"
            onClick={() => setMonthOffset((o) => o - 1)}
            className="cursor-pointer transition-colors hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60"
            style={navBtnStyle}
          >
            <ChevronLeft size={13} />
          </button>

          <p className="text-[11px] font-semibold truncate" style={{ color: "var(--text-primary)" }}>
            {monthName}
          </p>

          {/* AD ⇄ BS slider switch — off = AD, on = BS (Bikram Sambat) */}
          <button
            type="button"
            role="switch"
            aria-checked={isBS}
            aria-label="Use Bikram Sambat calendar"
            onClick={() => setIsBS((v) => !v)}
            className="cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60"
            style={{
              position: "relative",
              flex: "none",
              width: 34,
              height: 16,
              borderRadius: 999,
              background: isBS ? "var(--accent-subtle)" : "rgba(255,255,255,0.07)",
              border: `1px solid ${isBS ? "var(--accent)" : "rgba(255,255,255,0.12)"}`,
              transition: "background 0.25s, border-color 0.25s",
            }}
          >
            <span
              className="font-mono text-[7px] font-semibold"
              style={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                left: isBS ? 5 : undefined,
                right: isBS ? undefined : 5,
                color: isBS ? "var(--text-primary)" : "var(--text-faint)",
              }}
            >
              {isBS ? "BS" : "AD"}
            </span>
            <motion.span
              animate={{ x: isBS ? 19 : 1 }}
              transition={{ type: "spring", damping: 28, stiffness: 480 }}
              style={{
                position: "absolute",
                top: 1,
                left: 0,
                width: 12,
                height: 12,
                borderRadius: "50%",
                background: isBS ? "var(--accent)" : "rgba(255,255,255,0.55)",
                transition: "background 0.25s",
              }}
            />
          </button>

          <p className="font-mono text-[10px]" style={{ color: "var(--text-faint)" }}>
            {year}
          </p>

          {/* Jump back to the current month — only shown after navigating away */}
          {monthOffset !== 0 && (
            <motion.button
              type="button"
              aria-label="Go to today"
              title="Today"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={() => setMonthOffset(0)}
              className="cursor-pointer transition-colors hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60"
              style={{ ...navBtnStyle, color: "var(--accent)" }}
            >
              <Target size={11} />
            </motion.button>
          )}

          <button
            type="button"
            aria-label="Next month"
            onClick={() => setMonthOffset((o) => o + 1)}
            className="cursor-pointer transition-colors hover:text-white focus:outline-none focus-visible:ring-1 focus-visible:ring-white/60"
            style={navBtnStyle}
          >
            <ChevronRight size={13} />
          </button>
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
                background: day !== null && day === today ? "var(--accent-subtle)" : "transparent",
                color: day !== null && day === today
                  ? "var(--text-primary)"
                  : day
                  ? "var(--text-secondary)"
                  : "transparent",
                fontWeight: day !== null && day === today ? 600 : 400,
                outline: day !== null && day === today ? "1px solid var(--accent)" : "none",
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
