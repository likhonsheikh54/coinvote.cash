import { NextResponse } from "next/server"
import { fixBrokenLink } from "@/lib/actions/seo-actions"
import { isAdmin } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    // Check if the user is an admin
    const admin = await isAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Parse request body
    const body = await request.json()
    const { id, url } = body

    if (!id || !url) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    // Fix the broken link
    const result = await fixBrokenLink(id, url)

    return NextResponse.json({
      success: true,
      message: result.message,
    })
  } catch (error) {
    console.error("Error fixing broken link:", error)
    return NextResponse.json(
      {
        error: "Failed to fix broken link",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

