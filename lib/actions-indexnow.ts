'use server';

import { submitUrlToIndexNow, submitUrlsToIndexNow } from "./indexnow-api"
import { revalidatePath } from "next/cache"

type IndexNowResponse = {
  success: boolean;
  message: string;
}

/**
 * Submit a single URL to IndexNow when content is updated
 */
export async function submitPageToIndexNow(url: string, path: string): Promise<IndexNowResponse> {
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
export async function submitPagesToIndexNow(urls: string[], paths: string[] = []): Promise<IndexNowResponse> {
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

// Add the missing export for IndexNow key file content
export async function getIndexNowKeyFileContent(): Promise<string> {
  try {
    return '7e2d195823e7419283de865536920ba8';
  } catch (error) {
    console.error("Error in getIndexNowKeyFileContent:", error);
    throw new Error("Failed to get IndexNow key file content");
  }
}

