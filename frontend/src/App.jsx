import './App.css'
import { Routes, Route } from 'react-router-dom'

import Header from './components/Header'
import MainComp from './components/MainComp'
import Footer from './components/Footer'

import Dashboard from './pages/Dashboard'
import AuthBox from './pages/AuthBox'

//  ADD THESE IMPORTS
import Resume from './pages/Resume'
import Interview from './pages/Interview'


function App() {
  return (
    <Routes>

      {/* Existing Home Page */}
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

      {/* Existing Routes */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/AuthBox" element={<AuthBox />} />

      {/*  NEW ROUTES ADDED */}
      <Route path="/resume" element={<Resume />} />
      <Route path="/interview" element={<Interview />} />

    </Routes>
  )
}

export default App;