"use server"

import { neon } from "@neondatabase/serverless"
import { cookies } from "next/headers"
import type { User } from "firebase/auth"

const dbClient = neon(process.env.DATABASE_URL!)

// Create or update user in the database
export async function createOrUpdateUser(userInfo: {
  uid: string
  email: string
  username?: string
  role?: string
}) {
  try {
    const { uid, email, username, role = "user" } = userInfo

    // Check if user exists
    const existingUser = await dbClient`
      SELECT * FROM users WHERE id = ${uid}
    `

    if (existingUser.length === 0) {
      // Create new user
      await dbClient`
        INSERT INTO users (id, email, username, role)
        VALUES (${uid}, ${email}, ${username || null}, ${role})
      `
    } else {
      // Update existing user
      await dbClient`
        UPDATE users
        SET 
          email = ${email},
          username = COALESCE(${username || null}, username),
          updated_at = CURRENT_TIMESTAMP
        WHERE id = ${uid}
      `
    }

    return { success: true }
  } catch (error) {
    console.error("Error creating/updating user:", error)
    return { success: false, error }
  }
}

// Get user by ID
export async function getUserById(userId: string) {
  try {
    const user = await dbClient`
      SELECT * FROM users WHERE id = ${userId}
    `

    if (user.length > 0) {
      return { success: true, user: user[0] }
    } else {
      return { success: false, error: "User not found" }
    }
  } catch (error) {
    console.error("Error getting user:", error)
    return { success: false, error }
  }
}

// Check if user is admin
export async function isAdmin(userId: string) {
  try {
    const user = await dbClient`
      SELECT role FROM users WHERE id = ${userId}
    `

    if (user.length > 0 && user[0].role === "admin") {
      return { success: true, isAdmin: true }
    } else {
      return { success: true, isAdmin: false }
    }
  } catch (error) {
    console.error("Error checking admin status:", error)
    return { success: false, error, isAdmin: false }
  }
}

// Set session cookie
export async function setUserSession(user: User) {
  const session = {
    uid: user.uid,
    email: user.email,
    accessToken: await user.getIdToken(),
  }

  cookies().set("user-session", JSON.stringify(session), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7, // 1 week
    path: "/",
  })

  return { success: true }
}

// Get session from cookie
export async function getUserSession() {
  const sessionCookie = cookies().get("user-session")

  if (!sessionCookie) {
    return { success: false, error: "No session" }
  }

  try {
    const session = JSON.parse(sessionCookie.value)
    return { success: true, session }
  } catch (error) {
    return { success: false, error: "Invalid session" }
  }
}

// Clear session cookie
export async function clearUserSession() {
  cookies().delete("user-session")
  return { success: true }
}

