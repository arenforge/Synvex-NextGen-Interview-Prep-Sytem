// backend/db.js
import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

// pool database connections ko parking lots banadeta hai
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// It will check like database ka url sahi hai ya nhi , nhi hua to it wil return error
pool.connect()
  .then(() => console.log('Connected to PostgreSQL successfully!'))
  .catch(err => console.error('Database connection error:', err.stack));

// Export it so other files can use it
export default pool;
