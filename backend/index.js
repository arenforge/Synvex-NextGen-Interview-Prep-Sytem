// backend/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './db.js'; // Import our parking lot!

dotenv.config();
const app = express();

// Cors ye hai Middleware -> Node aur React baat kar sakte to each other
app.use(cors());
app.use(express.json());

// frontend react se data receive karega
app.post('/api/save-interview', async (req, res) => {
  // 1. Grab the exact data React sent us
  const { userName, email, question, aiResponse } = req.body;

  try {
    // 2. Insert into PostgreSQL securely ($1, $2 prevent hackers from running bad code)
    await pool.query(
      'INSERT INTO interviews (user_name, email, question, ai_response) VALUES ($1, $2, $3, $4)',
      [userName, email, question, aiResponse]
    );
    
    
    console.log("Data saved successfully!");
    res.json({ success: true, message: "Saved to database!" });

  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Failed to save to database' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server perfectly running on port ${PORT}`);
});
