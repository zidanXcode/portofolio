import { NextResponse } from "next/server"

let visitorCount = 0
let lastReset = Date.now()

function resetIfNeeded() {
  const now = Date.now()
  if (now - lastReset >= 24 * 60 * 60 * 1000) {
    visitorCount = 0
    lastReset = now
  }
}

export async function GET() {
  resetIfNeeded()
  return NextResponse.json({
    success: true,
    message: "Visitor count retrieved successfully",
    count: visitorCount,
    lastReset: new Date(lastReset).toISOString(),
  })
}

export async function POST() {
  resetIfNeeded()
  visitorCount++
  return NextResponse.json({
    success: true,
    message: "Visitor count updated successfully",
    count: visitorCount,
    lastReset: new Date(lastReset).toISOString(),
  })
}
