import './App.css'
import { Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import MainComp from './components/MainComp'
import Footer from './components/Footer'

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
        element={
          <>
            <Header />
            <MainComp />
            <Footer />
          </>
        }
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