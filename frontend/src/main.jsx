import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

// React App ko index.html ke root div mein render kar rahe hain
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BrowserRouter use kar rahe hain routing support ke liye */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
