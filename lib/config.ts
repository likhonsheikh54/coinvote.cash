// Configuration file for API keys and other environment variables

// CoinGecko API
export const COINGECKO_API_KEY = process.env.NEXT_PUBLIC_COINGECKO_API_KEY || ""
export const COINGECKO_API_URL = "https://api.coingecko.com/api/v3"

// CoinMarketCap API
export const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || ""
export const COINMARKETCAP_API_URL = "https://pro-api.coinmarketcap.com/v1"

// DexScreener API
export const DEXSCREENER_API_URL = "https://api.dexscreener.com"

// Database configuration (use environment variables, never hardcode credentials)
export const MONGODB_URI = process.env.MONGODB_URI || ""

// Firebase configuration (use environment variables)
export const FIREBASE_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
}

