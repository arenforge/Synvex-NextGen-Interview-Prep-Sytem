import './App.css'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import MainComp from './components/MainComp'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'
import AuthBox from './pages/AuthBox'

function App() {
  return (
    <Routes>
      <Route path="/" element={<><Header /><MainComp /><Footer /></>} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path = "/AuthBox" element={<AuthBox/>}/>
    </Routes>
  )
}

export default App;
