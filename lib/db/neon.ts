import { neon } from '@neondatabase/serverless';

// Create a SQL function that can be imported by other files
export const sql = neon(process.env.DATABASE_URL || '');

// Export additional database utility functions
export async function executeQuery<T = any>(query: string, params: any[] = []): Promise<T[]> {
  try {
    return await sql(query, params) as T[];
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Function to check database connection
export async function checkConnection(): Promise<boolean> {
  try {
    await sql`SELECT 1`;
    return true;
  } catch (error) {
    console.error('Database connection error:', error);
    return false;
  }
}

// Custom typing for database results
export type DBQueryResult<T> = T[];

// Mock function for development/testing when database is unavailable
export function mockQuery<T>(results: T[]): Promise<T[]> {
  return Promise.resolve(results);
} 