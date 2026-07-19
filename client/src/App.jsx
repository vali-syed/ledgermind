import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import LandingSections from './components/LandingSections/LandingSections'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Upload from './pages/Upload/Upload'
import './App.css'

function App() {
 

  const landingPage = (
    <div>
      <Navbar />
      <Hero />
      <LandingSections />
    </div>
  )

  return (
    <Routes>
      <Route path="/" element={landingPage} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/upload" element={<Upload />} />
    </Routes>
  )
}

export default App
