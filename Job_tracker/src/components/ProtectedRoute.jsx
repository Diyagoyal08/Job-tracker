 import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  const { status: authStatus, loading } = useSelector(state => state.auth)

 if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Loading...</p>
    </div>
  }

  if (!authStatus) {
    return <Navigate to="/login" replace />
  }

 

  return children
}

export default ProtectedRoute