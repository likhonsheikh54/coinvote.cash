"use server"

import { sql } from "@neondatabase/serverless"

/**
 * Check if a URL is valid and accessible
 * @param url The URL to check
 * @returns Boolean indicating if the URL is valid and accessible
 */
export async function checkUrl(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: "HEAD" })
    return response.status < 400
  } catch (error) {
    return false
  }
}

/**
 * Get all internal links from the database
 * @returns Array of internal links
 */
export async function getAllInternalLinks(): Promise<string[]> {
  try {
    const result = await sql`
      SELECT DISTINCT url 
      FROM (
        SELECT website as url FROM coins WHERE website IS NOT NULL
        UNION
        SELECT twitter as url FROM coins WHERE twitter IS NOT NULL
        UNION
        SELECT telegram as url FROM coins WHERE telegram IS NOT NULL
        UNION
        SELECT github as url FROM coins WHERE github IS NOT NULL
      ) as links
    `
    return result.rows.map((row) => row.url)
  } catch (error) {
    console.error("Error fetching internal links:", error)
    return []
  }
}

/**
 * Fix broken links in the database
 * @returns Number of fixed links
 */
export async function fixBrokenLinks(): Promise<number> {
  try {
    const links = await getAllInternalLinks()
    let fixedCount = 0

    for (const link of links) {
      const isValid = await checkUrl(link)

      if (!isValid) {
        // Update all instances of this broken link to null
        await sql`
          UPDATE coins 
          SET 
            website = CASE WHEN website = ${link} THEN NULL ELSE website END,
            twitter = CASE WHEN twitter = ${link} THEN NULL ELSE twitter END,
            telegram = CASE WHEN telegram = ${link} THEN NULL ELSE telegram END,
            github = CASE WHEN github = ${link} THEN NULL ELSE github END
          WHERE website = ${link} OR twitter = ${link} OR telegram = ${link} OR github = ${link}
        `
        fixedCount++
      }
    }

    return fixedCount
  } catch (error) {
    console.error("Error fixing broken links:", error)
    return 0
  }
}

