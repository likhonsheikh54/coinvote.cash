import { NextResponse } from "next/server"
import { fixAllBrokenLinksAndImages } from "@/lib/scripts/fix-all-links"
import { isAdmin } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    // Check if the user is an admin
    const admin = await isAdmin()
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Fix all broken links and images
    const result = await fixAllBrokenLinksAndImages()

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: `Fixed ${result.fixedLinks} broken links and ${result.fixedImages} broken images`,
      })
    } else {
      return NextResponse.json(
        {
          error: "Failed to fix all links and images",
          message: result.error,
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error fixing all links and images:", error)
    return NextResponse.json(
      {
        error: "Failed to fix all links and images",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}

