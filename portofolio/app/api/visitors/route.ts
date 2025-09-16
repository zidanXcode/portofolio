import { NextResponse } from "next/server"

let visitorCount = 0

export async function GET() {
  return NextResponse.json({ count: visitorCount })
}

export async function POST() {
  visitorCount++
  return NextResponse.json({ count: visitorCount })
}
