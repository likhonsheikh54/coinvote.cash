import { NextResponse } from "next/server"
import { sql } from "@neondatabase/serverless"

export async function GET() {
  try {
    // Create the coins table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS coins (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        symbol VARCHAR(50) NOT NULL,
        logo TEXT,
        price DECIMAL(18, 8) DEFAULT 0,
        price_per_token DECIMAL(18, 8) DEFAULT 0,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `

    // Create the promoted_coins table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS promoted_coins (
        id SERIAL PRIMARY KEY,
        coin_id INTEGER REFERENCES coins(id),
        tx_hash VARCHAR(255),
        active BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `

    // Check if we have any sample data
    const coinCount = await sql`SELECT COUNT(*) FROM coins`

    // Add sample data if none exists
    if (coinCount.rows[0].count === "0") {
      // Insert sample coins
      await sql`
        INSERT INTO coins (name, symbol, logo, price, price_per_token)
        VALUES 
          ('Bitcoin', 'BTC', 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png', 50000, 50000),
          ('Ethereum', 'ETH', 'https://assets.coingecko.com/coins/images/279/large/ethereum.png', 3000, 3000),
          ('Binance Coin', 'BNB', 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png', 500, 500),
          ('Solana', 'SOL', 'https://assets.coingecko.com/coins/images/4128/large/solana.png', 100, 100),
          ('Cardano', 'ADA', 'https://assets.coingecko.com/coins/images/975/large/cardano.png', 1.5, 1.5);
      `

      // Get the inserted coin IDs
      const coins = await sql`SELECT id FROM coins LIMIT 5`

      // Insert sample promoted coins
      for (const coin of coins.rows) {
        await sql`
          INSERT INTO promoted_coins (coin_id, tx_hash)
          VALUES (${coin.id}, ${`0x${Math.random().toString(16).substring(2, 10)}`});
        `
      }
    }

    return NextResponse.json({
      success: true,
      message: "Database initialized successfully",
    })
  } catch (error) {
    console.error("Error initializing database:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to initialize database",
      },
      { status: 500 },
    )
  }
}

