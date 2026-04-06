import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function testRenderDB() {
  try {
    const res = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
    console.log("Successfully connected to Render Database!");
    console.log("Your currently active tables are:");
    if (res.rows.length === 0) {
      console.log("No tables found. The database is empty.");
    } else {
      res.rows.forEach(row => console.log(`   - ${row.table_name}`));
    }
  } catch (err) {
    console.error("Render Database connection failed:", err);
  } finally {
    pool.end();
  }
}

testRenderDB();
