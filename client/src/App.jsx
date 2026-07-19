import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing/Landing'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import Upload from './pages/Upload/Upload'
import Dashboard from './pages/Dashboard/Dashboard'
import Chat from './pages/Chat/Chat'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import PublicRoute from './components/PublicRoute/PublicRoute'
import './App.css'

function App() {
 
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
      <Route path="/upload" element={<ProtectedRoute><Upload /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
    </Routes>
  )
}

export default App
