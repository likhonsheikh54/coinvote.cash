import { createClient } from "redis"

let redisClient: ReturnType<typeof createClient> | null = null

export const getRedisClient = async () => {
  if (!redisClient) {
    redisClient = createClient({
      url: process.env.REDIS_URL,
    })

    // Connect to redis
    if (!redisClient.isOpen) {
      await redisClient.connect()
    }
  }

  return redisClient
}

// Graceful shutdown
if (process.env.NODE_ENV !== "development") {
  ;["SIGINT", "SIGTERM"].forEach((signal) => {
    process.on(signal, async () => {
      if (redisClient) {
        await redisClient.quit()
        redisClient = null
      }
    })
  })
}

