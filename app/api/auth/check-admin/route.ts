import { NextResponse } from "next/server"
import { sql } from "@neondatabase/serverless"
import { cookies } from "next/headers"

export async function GET() {
  try {
    const cookieStore = cookies()
    const sessionCookie = cookieStore.get("session")?.value

    if (!sessionCookie) {
      return NextResponse.json({ isAdmin: false })
    }

    // Since we don't have Firebase Admin credentials,
    // we'll use a simpler approach to check admin status
    try {
      // Check if the user is an admin based on email in the database
      // This assumes you have a users table with an is_admin column
      const result = await sql`
        SELECT is_admin FROM users 
        WHERE email = ${process.env.ADMIN_MAIL}
      `

      const isAdmin = result.rows.length > 0 ? result.rows[0].is_admin : false

      return NextResponse.json({ isAdmin })
    } catch (dbError) {
      console.error("Database error:", dbError)
      return NextResponse.json({ isAdmin: false })
    }
  } catch (error) {
    console.error("Error checking admin status:", error)
    // Return a proper JSON response even in case of error
    return NextResponse.json({
      isAdmin: false,
      error: "Failed to check admin status",
    })
  }
}

