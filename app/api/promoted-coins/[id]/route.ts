import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!);

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Check if user is admin
    // This would typically be done with authentication middleware

    await sql`
      UPDATE promoted_coins
      SET active = false
      WHERE id = ${id}
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error removing promoted coin:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to remove promoted coin",
      },
      { status: 500 },
    )
  }
}

