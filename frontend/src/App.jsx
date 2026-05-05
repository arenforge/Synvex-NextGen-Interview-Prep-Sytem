import './App.css'
import { Routes, Route } from 'react-router-dom'

import LandingPage from './pages/LandingPage'

import Dashboard from './pages/Dashboard'
import AuthBox from './pages/AuthBox'

 
import Resume from './pages/Resume'
import Interview from './pages/Interview'
import Reports from './pages/Reports'
import QueBank from './pages/QueBank'


// Yeh main component hai jo decide karta hai kab kya dikhana hai (Routing logic)
// Yahan humne saare pages ko connect kiya hai taaki user seamlessly navigate kar sake
// Ab yahan se hum routing handle karenge
function App() {
  return (
    // Saare paths yahan defined hain taaki navigation sahi chale
    <Routes>

       
      <Route
        path="/"
        element={<LandingPage />}
      />

      
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/AuthBox" element={<AuthBox />} />
 
      <Route path="/resume" element={<Resume />} />
      <Route path="/interview" element={<Interview />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/que-bank" element={<QueBank />} />

    </Routes>
  )
}

export default App;