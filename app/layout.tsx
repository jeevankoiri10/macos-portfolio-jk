import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { MotionConfig } from 'framer-motion'
import './globals.css'
import { Analytics } from "@vercel/analytics/react"
// Page metadata lives in /config/siteConfig.ts under `siteConfig.seo`.
import { siteConfig } from '@/config/siteConfig'

export const metadata: Metadata = {
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // The Geist variables are declared on <html> and the font-sans default
    // is set via the body rule in globals.css — no need to duplicate a className here.
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body>
        {/* `reducedMotion="user"` silences Framer Motion animations for users
            with prefers-reduced-motion enabled, in one place, for the whole tree. */}
        <MotionConfig reducedMotion="user">
          {children}
        </MotionConfig>
        <Analytics />
      </body>
    </html>
  )
}
