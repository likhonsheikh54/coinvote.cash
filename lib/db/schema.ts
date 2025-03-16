import { neon } from "@neondatabase/serverless"

const dbClient = neon(process.env.DATABASE_URL!)

export async function initDatabase() {
  try {
    // Create users table
    await dbClient`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        username TEXT UNIQUE,
        role TEXT NOT NULL DEFAULT 'user',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create coins table
    await dbClient`
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
    await dbClient`
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
    await dbClient`
      CREATE TABLE IF NOT EXISTS trending_coins (
        id SERIAL PRIMARY KEY,
        coin_id TEXT NOT NULL REFERENCES coins(id) ON DELETE CASCADE,
        trend_score INT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create promoted_coins table
    await dbClient`
      CREATE TABLE IF NOT EXISTS promoted_coins (
        id SERIAL PRIMARY KEY,
        coin_id TEXT NOT NULL REFERENCES coins(id) ON DELETE CASCADE,
        start_date TIMESTAMP WITH TIME ZONE NOT NULL,
        end_date TIMESTAMP WITH TIME ZONE NOT NULL,
        position INT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Create airdrops table
    await dbClient`
      CREATE TABLE IF NOT EXISTS airdrops (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        symbol TEXT NOT NULL,
        logo TEXT,
        description TEXT,
        start_date TIMESTAMP WITH TIME ZONE,
        end_date TIMESTAMP WITH TIME ZONE,
        reward TEXT,
        requirements TEXT[],
        website TEXT,
        status TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `

    console.log("Database tables created successfully")
    return { success: true }
  } catch (error) {
    console.error("Error creating database tables:", error)
    return { success: false, error }
  }
}

export async function executeQuery(query: string, params: any[] = []) {
  try {
    const result = await dbClient.query(query, params)
    return { success: true, data: result }
  } catch (error) {
    console.error("Database query error:", error)
    return { success: false, error }
  }
}

