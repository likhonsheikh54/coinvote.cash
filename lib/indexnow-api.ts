// IndexNow API integration for search engine indexing

const INDEXNOW_API_URL = "https://api.indexnow.org/IndexNow"
const INDEXNOW_KEY = "7e2d195823e7419283de865536920ba8"
const SITE_HOST = "coinvotes.vercel.app"
const KEY_LOCATION = `https://${SITE_HOST}/${INDEXNOW_KEY}.txt`

/**
 * Submit a single URL to IndexNow
 * @param url The URL to submit
 */
export async function submitUrlToIndexNow(url: string): Promise<boolean> {
  try {
    const response = await fetch(`https://api.indexnow.org/indexnow?url=${encodeURIComponent(url)}&key=${INDEXNOW_KEY}`)

    return response.status === 200
  } catch (error) {
    console.error("Error submitting URL to IndexNow:", error)
    return false
  }
}

/**
 * Submit multiple URLs to IndexNow
 * @param urls Array of URLs to submit
 */
export async function submitUrlsToIndexNow(urls: string[]): Promise<boolean> {
  try {
    const response = await fetch(INDEXNOW_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        host: SITE_HOST,
        key: INDEXNOW_KEY,
        keyLocation: KEY_LOCATION,
        urlList: urls,
      }),
    })

    return response.status === 200
  } catch (error) {
    console.error("Error submitting URLs to IndexNow:", error)
    return false
  }
}

/**
 * Create the key file content for IndexNow verification
 * @returns The content for the key file
 */
export function getIndexNowKeyFileContent(): string {
  return INDEXNOW_KEY
}

