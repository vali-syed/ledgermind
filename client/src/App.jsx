import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import LandingSections from './components/LandingSections/LandingSections'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Upload from './pages/Upload/Upload'
import Dashboard from './pages/Dashboard/Dashboard'
import Chat from './pages/Chat/Chat'
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
      <Route path="/dashboard" element={<Dashboard />}/>
      <Route path = "/chat" element = {<Chat />} />
    </Routes>
  )
}

export default App
