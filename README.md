# CoinVote.cash

A modern cryptocurrency discovery and voting platform. Track prices, market caps, and community sentiment in real-time.

## Core Features

- **Community Voting**: Discover trending cryptocurrencies based on user votes
- **Price Tracking**: Real-time price and market cap data
- **Personalized Portfolio**: Track your favorite coins
- **Trending Analysis**: Identify emerging market patterns
- **DEX Integration**: Direct access to decentralized exchanges

## API Endpoints

- **/api/coins/[symbol]/votes**: Get or update community vote counts
- **/api/coins/[symbol]/chart**: Retrieve historical price data
- **/api/listing**: Submit new cryptocurrency listings
- **/api/trending**: Get currently trending tokens
- **/api/upload-logo**: Upload coin logos (Vercel Blob storage)

## Technical Architecture

### Performance Optimizations
- Server-side Rendering for critical data
- Incremental Static Regeneration for coin pages
- Redis caching to reduce database load
- Next.js Image optimization
- Strategic API response caching

### SEO Enhancements
- Dynamic per-page metadata
- Automated sitemap generation
- Structured data (JSON-LD)
- Search engine-friendly routing

### Infrastructure
- **Frontend**: Next.js
- **Database**: PostgreSQL (Neon)
- **Caching**: Redis (Upstash)
- **Storage**: Vercel Blob
- **Auth**: Firebase Authentication
- **Hosting**: Vercel

### Security
- Server-side environment variables
- Comprehensive input validation
- API rate limiting
- Strict CORS policies

### Monitoring
- Vercel Analytics and Speed Insights
- Core Web Vitals tracking
- User behavior analytics

## Community Pages
- /community-votes - Community-driven token rankings
- /gainers-losers - Top performing and declining assets
- /meme-explorer - Dedicated meme coin discovery
- /eth-wars - Ethereum ecosystem competition tracker

Visit [CoinVote.cash](https://coinvote.cash) to start discovering and voting for your favorite cryptocurrencies.
