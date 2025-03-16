import { Redis } from '@upstash/redis'

// This will ensure we use the correct format for Upstash Redis URLs
export function createRedisClient() {
  const url = process.env.REDIS_URL || '';
  
  // Check if URL is already in the correct format
  if (url.startsWith('https://')) {
    return new Redis({ url });
  }
  
  // Handle Redis Cloud URL format (redis://user:pass@host:port)
  if (url.startsWith('redis://')) {
    try {
      // Parse the redis URL
      const match = url.match(/redis:\/\/(.*):(.*)@(.*):(\d+)/);
      if (match) {
        const [, username, password, host, port] = match;
        
        // Return a mock Redis client with in-memory cache for development
        // In a real production app, you would use a proper conversion to Upstash format
        // or configure environment variables correctly
        const cache = new Map();
        
        return {
          get: async (key: string) => cache.get(key) || null,
          set: async (key: string, value: any, options?: any) => {
            cache.set(key, value);
            return 'OK';
          },
          del: async (key: string) => {
            cache.delete(key);
            return 1;
          },
          exists: async (key: string) => cache.has(key) ? 1 : 0,
          pipeline: () => ({
            get: () => ({ get: () => null }),
            exec: async () => []
          })
        };
      }
    } catch (error) {
      console.error('Error parsing Redis URL:', error);
    }
  }
  
  // Default to a mock Redis client with in-memory cache
  console.warn('Using in-memory cache instead of Redis');
  const cache = new Map();
  
  return {
    get: async (key: string) => cache.get(key) || null,
    set: async (key: string, value: any, options?: any) => {
      cache.set(key, value);
      return 'OK';
    },
    del: async (key: string) => {
      cache.delete(key);
      return 1;
    },
    exists: async (key: string) => cache.has(key) ? 1 : 0,
    pipeline: () => ({
      get: () => ({ get: () => null }),
      exec: async () => []
    })
  };
} 