import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';

dotenv.config();

// pool database connections ko multiple parking lots banadeta hai taaki eksath alag alag database connections create ho sake
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('localhost') 
    ? { rejectUnauthorized: false } 
    : false
});

// Avoid crashing the server on idle connection errors (common with Render/Vercel)
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

// It will check like database ka url sahi hai ya nhi , nhi hua to it wil return error
pool.connect()
  .then(client => {
    console.log('Connected to PostgreSQL successfully!');
    client.release(); // IMPORTANT: Release the connection back to the pool to prevent unhandled Client errors if the connection drops!
  })
  .catch(err => console.error('Database connection error:', err.stack));

// Export it so other files can use it (jaise hamne ise controllers me use kiya)
export default pool;
