import { neon } from "@neondatabase/serverless"

/**
 * Initialize the database schema with all required tables
 * Call this script after deployment to ensure the database is properly set up
 */
export async function initializeDatabase() {
  const sql = neon(process.env.DATABASE_URL!)
  
  try {
    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        username TEXT UNIQUE,
        role TEXT NOT NULL DEFAULT 'user',
        is_admin BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create coins table
    await sql`
      CREATE TABLE IF NOT EXISTS coins (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        symbol TEXT NOT NULL,
        logo TEXT,
        description TEXT,
        website TEXT,
        twitter TEXT,
        telegram TEXT,
        github TEXT,
        contract_address TEXT,
        chain TEXT,
        market_cap BIGINT,
        price DOUBLE PRECISION,
        change_24h DOUBLE PRECISION,
        votes_count INT DEFAULT 0,
        is_promoted BOOLEAN DEFAULT FALSE,
        is_verified BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create votes table
    await sql`
      CREATE TABLE IF NOT EXISTS votes (
        id SERIAL PRIMARY KEY,
        coin_id TEXT NOT NULL REFERENCES coins(id) ON DELETE CASCADE,
        user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
        ip_address TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(coin_id, user_id, ip_address, (DATE(created_at)))
      )
    `

    // Create trending_coins table
    await sql`
      CREATE TABLE IF NOT EXISTS trending_coins (
        id SERIAL PRIMARY KEY,
        coin_id TEXT NOT NULL REFERENCES coins(id) ON DELETE CASCADE,
        trend_score INT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create promoted_coins table
    await sql`
      CREATE TABLE IF NOT EXISTS promoted_coins (
        id SERIAL PRIMARY KEY,
        coin_id TEXT NOT NULL REFERENCES coins(id) ON DELETE CASCADE,
        start_date TIMESTAMP WITH TIME ZONE NOT NULL,
        end_date TIMESTAMP WITH TIME ZONE NOT NULL,
        position INT,
        tx_hash VARCHAR(255),
        active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Insert sample data if needed
    const coinCount = await sql`SELECT COUNT(*) FROM coins`
    
    if (parseInt(coinCount.rows[0].count) === 0) {
      // Add sample coins
      await sql`
        INSERT INTO coins (id, name, symbol, logo, price, market_cap, votes_count, is_verified)
        VALUES 
          ('bitcoin', 'Bitcoin', 'BTC', 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png', 50000, 950000000000, 1200, TRUE),
          ('ethereum', 'Ethereum', 'ETH', 'https://assets.coingecko.com/coins/images/279/large/ethereum.png', 3000, 350000000000, 980, TRUE),
          ('binancecoin', 'Binance Coin', 'BNB', 'https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png', 500, 75000000000, 750, TRUE),
          ('solana', 'Solana', 'SOL', 'https://assets.coingecko.com/coins/images/4128/large/solana.png', 100, 40000000000, 820, TRUE),
          ('cardano', 'Cardano', 'ADA', 'https://assets.coingecko.com/coins/images/975/large/cardano.png', 1.5, 15000000000, 620, TRUE)
      `
      
      // Add sample promoted coins
      await sql`
        INSERT INTO promoted_coins (coin_id, start_date, end_date, position, tx_hash, active)
        VALUES 
          ('bitcoin', NOW(), NOW() + INTERVAL '30 days', 1, '0x1234567890abcdef', TRUE),
          ('ethereum', NOW(), NOW() + INTERVAL '30 days', 2, '0x2345678901abcdef', TRUE),
          ('solana', NOW(), NOW() + INTERVAL '30 days', 3, '0x3456789012abcdef', TRUE)
      `
    }
    
    console.log("Database initialized successfully")
    return { success: true, message: "Database initialized successfully" }
  } catch (error) {
    console.error("Error initializing database:", error)
    return { success: false, error, message: "Failed to initialize database" }
  }
} 