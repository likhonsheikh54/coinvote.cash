import { NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
  try {
    // Create the coins table if it doesn't exist
    await sql`