import { NextResponse } from "next/server"
import { sql } from "@/lib/db/neon"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const id = formData.get("id") as string

    // Check if user is admin
    // This would typically be done with authentication middleware

    await sql`
      UPDATE promoted_coins
      SET active = false
      WHERE id = ${id}
    `

    return NextResponse.redirect("/admin/promoted-coins")
  } catch (error) {
    console.error("Error deactivating promoted coin:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to deactivate promoted coin",
      },
      { status: 500 },
    )
  }
}

