import { NextResponse } from "next/server"
import { tokenScheduler } from "@/lib/scheduler"

// Flag to ensure we only initialize once
let initialized = false

export async function GET() {
  if (!initialized) {
    // Start the token scheduler
    tokenScheduler.start()
    initialized = true

    return NextResponse.json({ success: true, message: "Token scheduler initialized" })
  }

  return NextResponse.json({ success: true, message: "Token scheduler already running" })
}

