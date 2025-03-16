import { getApps, initializeApp } from "firebase-admin/app"
import { credential } from "firebase-admin"

export function initAdmin() {
  try {
    if (getApps().length === 0) {
      // Use the application default credentials approach
      // This will use the NEXT_PUBLIC_FIREBASE_* environment variables
      initializeApp({
        credential: credential.applicationDefault(),
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      })

      console.log("Firebase Admin initialized successfully")
    }
  } catch (error) {
    console.error("Error initializing Firebase Admin:", error)
    // Don't throw here, just log the error to prevent app crashes
  }
}

