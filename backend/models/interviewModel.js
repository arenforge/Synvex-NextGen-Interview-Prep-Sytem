// models/interviewModel.js
import pool from '../config/db.js';

export const createInterview = async (userName, email, question, aiResponse) => {
  const result = await pool.query(
    'INSERT INTO interviews (user_name, email, question, ai_response) VALUES ($1, $2, $3, $4) RETURNING *',
    [userName, email, question, aiResponse]
  );
  return result.rows[0];
};
