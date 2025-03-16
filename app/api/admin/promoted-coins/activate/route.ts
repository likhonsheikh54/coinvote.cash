import { NextResponse } from "next/server"
import { sql } from "@neondatabase/serverless"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const id = formData.get("id") as string

    // Check if user is admin
    // This would typically be done with authentication middleware

    await sql`
      UPDATE promoted_coins
      SET active = true
      WHERE id = ${id}
    `

    return NextResponse.redirect("/admin/promoted-coins")
  } catch (error) {
    console.error("Error activating promoted coin:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to activate promoted coin",
      },
      { status: 500 },
    )
  }
}

