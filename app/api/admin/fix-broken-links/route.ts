import { NextResponse } from "next/server"
import { fixBrokenLinks } from "@/lib/utils/link-checker"
import { isAdmin } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    // Check if the user is an admin
    const admin = await isAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Fix broken links
    const fixedCount = await fixBrokenLinks()

    return NextResponse.json({
      success: true,
      message: `Fixed ${fixedCount} broken links`,
    })
  } catch (error) {
    console.error("Error fixing broken links:", error)
    return NextResponse.json(
      {
        error: "Failed to fix broken links",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

