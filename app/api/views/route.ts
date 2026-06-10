import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

// Uses Upstash REST API — set UPSTASH_REDIS_REST_URL + UPSTASH_REDIS_REST_TOKEN in Vercel env vars
// Free tier at upstash.com is plenty for a portfolio
async function redis(command: string): Promise<number | null> {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return null

  try {
    const res = await fetch(`${url}/${command}/portfolio:views`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    })
    const data = await res.json()
    // GET on a missing key returns null — treat as zero visits.
    // Upstash returns GET results as strings, INCR as numbers — normalize.
    return data.result === null ? 0 : Number(data.result)
  } catch {
    return null
  }
}

/** Read the counter without changing it. */
export async function GET() {
  return NextResponse.json({ count: await redis("get") })
}

/** Count one visit — called once per browser session (see lib/views.ts). */
export async function POST() {
  return NextResponse.json({ count: await redis("incr") })
}
