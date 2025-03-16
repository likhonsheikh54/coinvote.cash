"use server"

import { submitUrlToIndexNow, submitUrlsToIndexNow } from "./indexnow-api"
import { revalidatePath } from "next/cache"

/**
 * Submit a single URL to IndexNow when content is updated
 */
export async function submitPageToIndexNow(url: string, path: string) {
  try {
    const success = await submitUrlToIndexNow(url)

    // Revalidate the path to ensure fresh content
    revalidatePath(path)

    return {
      success,
      message: success ? "URL submitted successfully" : "Failed to submit URL",
    }
  } catch (error) {
    console.error("Error in submitPageToIndexNow:", error)
    return {
      success: false,
      message: "Error submitting URL",
    }
  }
}

/**
 * Submit multiple URLs to IndexNow in bulk
 */
export async function submitPagesToIndexNow(urls: string[], paths: string[] = []) {
  try {
    const success = await submitUrlsToIndexNow(urls)

    // Revalidate all paths to ensure fresh content
    paths.forEach((path) => revalidatePath(path))

    return {
      success,
      message: success ? "URLs submitted successfully" : "Failed to submit URLs",
    }
  } catch (error) {
    console.error("Error in submitPagesToIndexNow:", error)
    return {
      success: false,
      message: "Error submitting URLs",
    }
  }
}

