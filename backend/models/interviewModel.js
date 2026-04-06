// models/interviewModel.js
import pool from '../config/db.js';
export const syncUser = async (email, name) => {
  const result = await pool.query(
    'INSERT INTO users (email, name) VALUES ($1, $2) ON CONFLICT (email) DO UPDATE SET name = $2 RETURNING *',
    [email, name]
  );
  return result.rows[0];
  
};
export const startSession = async (email, role, level) => {
  const result = await pool.query(
    'INSERT INTO interview_sessions (email, role, level) VALUES ($1, $2, $3) RETURNING id',
    [email, role, level]
  );
  return result.rows[0].id; // We need this ID for the next step!
};
export const addMessage = async (sessionId, aiQue, userAns) => {
  const result = await pool.query(
    'INSERT INTO messages (session_id, aiQue, userAns) VALUES ($1, $2, $3) RETURNING *',
    [sessionId, aiQue, userAns]
  );
  return result.rows[0];
};
export const updateFeedback = async (sessionId, feedback) => {
  await pool.query(
    'UPDATE interview_sessions SET feedback = $1 WHERE id = $2',
    [feedback, sessionId]
  );
};
export const getSessionMessages = async (sessionId) => {
  const result = await pool.query(
    'SELECT aique, userans FROM messages WHERE session_id = $1 ORDER BY id ASC',
    [sessionId]
  );
  return result.rows;
};




