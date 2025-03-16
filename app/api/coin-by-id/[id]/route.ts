import { NextResponse } from "next/server"
import { sql } from "@neondatabase/serverless"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    // Query the database for the coin with the given ID
    const result = await sql`
      SELECT * FROM coins WHERE id = ${id}
    `

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Coin not found" }, { status: 404 })
    }

    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error("Error fetching coin:", error)
    return NextResponse.json({ error: "Failed to fetch coin data" }, { status: 500 })
  }
}

