import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  connectionString: 'postgresql://synvex_user:7NbOYDIcodXdesuO1yh6CDpmq7zwpEDE@dpg-d79na7dm5p6s73a68an0-a.virginia-postgres.render.com/synvex',
  ssl: {
    rejectUnauthorized: false
  }
});

const setupSql = `
CREATE TABLE IF NOT EXISTS users (
    email VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS interview_sessions (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) REFERENCES users(email),
    role VARCHAR(255) NOT NULL,
    level VARCHAR(50) NOT NULL,
    feedback TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    session_id INTEGER REFERENCES interview_sessions(id) ON DELETE CASCADE,
    aique TEXT NOT NULL,
    userans TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

const setupDB = async () => {
  try {
    console.log('Connecting to Render database...');
    await pool.query(setupSql);
    console.log('Successfully created tables in Render Database!');
  } catch (err) {
    console.error('Error setting up tables:', err);
  } finally {
    pool.end();
  }
};

setupDB();
