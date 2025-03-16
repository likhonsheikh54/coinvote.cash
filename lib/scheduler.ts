import { scanNewTokens, updateTokenAnalysis } from "./token-scanner"
import { getNewlyListedCoins, getTopCoins, getTrendingCoinsList } from "./actions"

// Simple in-memory scheduler for demo purposes
// In a production environment, you would use a proper job scheduler like Bull or Agenda
export class TokenScheduler {
  private scanInterval: NodeJS.Timeout | null = null
  private updateInterval: NodeJS.Timeout | null = null
  private dataRefreshInterval: NodeJS.Timeout | null = null

  // Start the scheduler
  start() {
    // Scan for new tokens every 15 minutes
    this.scanInterval = setInterval(
      async () => {
        await scanNewTokens()
      },
      15 * 60 * 1000,
    )

    // Update token analysis every 6 hours
    this.updateInterval = setInterval(
      async () => {
        await updateTokenAnalysis()
      },
      6 * 60 * 60 * 1000,
    )

    // Refresh coin data every 5 minutes
    this.dataRefreshInterval = setInterval(
      async () => {
        await Promise.all([getTopCoins(), getTrendingCoinsList(), getNewlyListedCoins()])

        // Revalidate key pages
        // In a real app, you would use a more sophisticated approach
        console.log("Refreshed coin data")
      },
      5 * 60 * 1000,
    )

    console.log("Token scheduler started")
  }

  // Stop the scheduler
  stop() {
    if (this.scanInterval) {
      clearInterval(this.scanInterval)
      this.scanInterval = null
    }

    if (this.updateInterval) {
      clearInterval(this.updateInterval)
      this.updateInterval = null
    }

    if (this.dataRefreshInterval) {
      clearInterval(this.dataRefreshInterval)
      this.dataRefreshInterval = null
    }

    console.log("Token scheduler stopped")
  }
}

// Singleton instance
export const tokenScheduler = new TokenScheduler()

