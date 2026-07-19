import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'
import AppNavbar from '../AppNavbar/AppNavbar'

function ProtectedRoute({ children }) {
  const token = Cookies.get('jwt_token')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return (
    <>
      <AppNavbar />
      {children}
    </>
  )
}

export default ProtectedRoute
