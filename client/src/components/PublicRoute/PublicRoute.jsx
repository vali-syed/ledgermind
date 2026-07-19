import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'

function PublicRoute({ children }) {
  const token = Cookies.get('jwt_token')

  if (token) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default PublicRoute
