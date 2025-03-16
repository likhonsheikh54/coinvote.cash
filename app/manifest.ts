import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Coinvote.cash - Cryptocurrency Voting Platform",
    short_name: "Coinvote",
    description:
      "Vote for your favorite cryptocurrencies, discover trending coins, and track the hottest tokens in the market on Coinvote.cash",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#F7931A",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any maskable",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any maskable",
      },
    ],
    orientation: "portrait",
    categories: [
      "finance",
      "business",
      "cryptocurrency",
      "blockchain",
      "investment",
    ],
    screenshots: [
      {
        src: "/screenshots/home.png",
        sizes: "1280x720",
        type: "image/png",
        label: "Coinvote.cash Home Page",
      },
      {
        src: "/screenshots/coin-details.png",
        sizes: "1280x720",
        type: "image/png",
        label: "Coin Details Page",
      },
    ],
    shortcuts: [
      {
        name: "Trending Coins",
        short_name: "Trending",
        description: "View trending cryptocurrencies",
        url: "/coins/trending",
        icons: [{ src: "/icons/trending.png", sizes: "96x96" }],
      },
      {
        name: "Most Voted Coins",
        short_name: "Most Voted",
        description: "View most voted cryptocurrencies",
        url: "/coins/most-voted",
        icons: [{ src: "/icons/popular.png", sizes: "96x96" }],
      },
    ],
    prefer_related_applications: false,
  }
} 