// backend/db.js
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

// We create the "Parking Lot" of database connections here
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// A quick test to ensure our password and database URL are correct
pool.connect()
  .then(() => console.log('Connected to PostgreSQL successfully!'))
  .catch(err => console.error('Database connection error:', err.stack));

// Export it so other files can use it
export default pool;
