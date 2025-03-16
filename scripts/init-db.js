/**
 * Script to initialize the database after deployment
 * Run this script in the terminal after deploying to Vercel:
 * node scripts/init-db.js https://your-deployed-app.vercel.app
 */

const baseUrl = process.argv[2] || 'http://localhost:3000';

async function initializeDatabase() {
  try {
    console.log(`Initializing database for ${baseUrl}...`);
    
    const response = await fetch(`${baseUrl}/api/init-db`);
    const data = await response.json();
    
    if (data.success) {
      console.log('✅ Database initialized successfully!');
    } else {
      console.error('❌ Failed to initialize database:', data.message);
      console.error(data.error);
    }
  } catch (error) {
    console.error('❌ Error initializing database:', error);
  }
}

initializeDatabase(); 