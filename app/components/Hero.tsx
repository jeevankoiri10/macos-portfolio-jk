"use client"

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Twitter, Github, BookOpen, ScrollText } from 'lucide-react'
// Text + social links come from /config/siteConfig.ts.
import { siteConfig } from '@/config/siteConfig'

export default function Hero({
  compact = false,
  onOpenResume,
}: {
  compact?: boolean
  /** Opens the Résumé window on desktop; mobile falls back to the #resume anchor. */
  onOpenResume?: () => void
}) {
  const { personal, social } = siteConfig

  return (
    <section className="px-6 pt-7 pb-6 flex flex-col h-full" style={{ minHeight: 0 }}>

      {/* Name — edit siteConfig.personal.firstName / lastName */}
      <div className="mb-5">
        <h1
          className="font-semibold tracking-tight text-white leading-[0.92] mb-3"
          style={{ fontSize: compact ? 46 : 56 }}
        >
          {personal.firstName}<br />{personal.lastName}
        </h1>
        <p className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: "var(--text-secondary)" }}>
          {personal.role}
        </p>
      </div>

      <div style={{ height: 1, background: "var(--separator)", marginBottom: 20 }} />

      {/* Bio — edit siteConfig.personal.tagline */}
      <p className="text-[13px] leading-[1.75]" style={{ color: "var(--text-secondary)" }}>
        {personal.tagline}
      </p>

      {/* View Résumé — opens the Résumé window (desktop) or jumps to #resume (mobile) */}
      <motion.a
        href={onOpenResume ? undefined : "#resume"}
        role="button"
        tabIndex={0}
        onClick={(e) => {
          if (!onOpenResume) return
          e.preventDefault()
          onOpenResume()
        }}
        onKeyDown={(e) => {
          if (onOpenResume && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault()
            onOpenResume()
          }
        }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", damping: 22, stiffness: 420 }}
        className="inline-flex items-center gap-2 self-start mt-5 px-4 py-2 rounded-lg font-mono text-[10px] uppercase tracking-[0.14em] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        style={{
          background: "rgba(255,255,255,0.07)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "var(--text-primary)",
        }}
      >
        <ScrollText size={13} />
        View Résumé
      </motion.a>

      {/* Footer */}
      <div
        className="flex items-center justify-between mt-auto pt-5"
        style={{ borderTop: "1px solid var(--separator)" }}
      >
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-md overflow-hidden flex-none">
            {/* Avatar — edit siteConfig.personal.avatar and drop your image into /public.
                alt="" because the name is already rendered next to it (avoid double announcement).
                priority because the avatar is above the fold on every viewport. */}
            <Image src={personal.avatar} alt="" fill priority className="object-cover" />
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>
              {personal.username}
            </p>
            <p className="font-mono text-[10px]" style={{ color: "var(--text-faint)" }}>
              {personal.location.split(",")[0]} · {personal.age}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {[
            { href: social.twitter, icon: <Twitter size={15} />, label: "X" },
            { href: social.github,  icon: <Github size={15} />,  label: "GitHub" },
            { href: social.blog,    icon: <BookOpen size={15} />, label: "Blog" },
          ].map(({ href, icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
