import './App.css'
import { Routes, Route } from 'react-router-dom'

import LandingPage from './pages/LandingPage'

import Dashboard from './pages/Dashboard'
import AuthBox from './pages/AuthBox'

 
import Resume from './pages/Resume'
import Interview from './pages/Interview'
import Reports from './pages/Reports'
import QueBank from './pages/QueBank'


function App() {
  return (
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