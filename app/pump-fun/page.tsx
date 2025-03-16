import type { Metadata } from "next"
import PumpFunClientPage from "./PumpFunClientPage"

export const metadata: Metadata = {
  title: "Pump.fun Explorer | Coinvote.xyz",
  description: "Discover trending tokens on pump.fun. Find the best pump.fun and Moonshot tokens with real-time data.",
  keywords: ["pump.fun", "moonshot", "tokens", "cryptocurrency", "meme coins", "trending tokens"],
}

export default async function PumpFunPage() {
  return <PumpFunClientPage />
}

