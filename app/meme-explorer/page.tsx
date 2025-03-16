import type { Metadata } from "next"
import MemeExplorerClientPage from "./MemeExplorerClientPage"
import { viewport } from "../viewport"

export const metadata: Metadata = {
  title: "Meme Explorer | Coinvote.xyz",
  description:
    "Discover and track the best meme coins. Find trending meme tokens, their performance, and community sentiment.",
  keywords: ["meme coins", "meme tokens", "doge", "shiba inu", "pepe", "cryptocurrency", "crypto memes"],
}

export default async function MemeExplorerPage() {
  return <MemeExplorerClientPage />
}

export { viewport }

