"use server"

import { sql } from "@neondatabase/serverless"
import { fixBrokenLinks } from "@/lib/utils/link-checker"

/**
 * Fix all broken links and images in the database
 */
export async function fixAllBrokenLinksAndImages() {
  try {
    console.log("Starting to fix broken links...")
    const fixedLinksCount = await fixBrokenLinks()
    console.log(`Fixed ${fixedLinksCount} broken links`)

    // Fix broken images
    console.log("Starting to fix broken images...")
    const result = await sql`
      UPDATE coins
      SET logo = NULL
      WHERE logo IS NOT NULL AND (
        logo NOT LIKE 'http%' OR
        logo LIKE '%undefined%' OR
        logo LIKE '%null%' OR
        logo = ''
      )
    `
    console.log(`Fixed ${result.rowCount} broken images`)

    return {
      success: true,
      fixedLinks: fixedLinksCount,
      fixedImages: result.rowCount,
    }
  } catch (error) {
    console.error("Error fixing all links and images:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

