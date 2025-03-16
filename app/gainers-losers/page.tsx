import type { Metadata } from "next"
import { viewport } from "../viewport"
import GainersLosersClientPage from "./GainersLosersClientPage"

export { viewport }

export const metadata: Metadata = {
  title: "Gainers & Losers | Coinvote.xyz",
  description: "Track the biggest gainers and losers in the cryptocurrency market. Real-time data on price movements.",
  keywords: ["crypto gainers", "crypto losers", "price movement", "cryptocurrency", "market movers"],
}

export default async function GainersLosersPage() {
  return <GainersLosersClientPage />
}

