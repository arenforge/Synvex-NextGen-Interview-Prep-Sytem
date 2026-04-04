// middleware/errorHandler.js
export const errorHandler = (err, req, res, next) => {
  console.error('Server Error:', err.message);
  res.status(500).json({ error: err.message || 'Something went wrong!' });
};
