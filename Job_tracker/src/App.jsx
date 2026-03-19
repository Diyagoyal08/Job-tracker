 import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login, logout } from './store/slices/authSlice'
import authService from './appwrite/auth'
import Dashboard from './pages/Dashboard'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData))
        } else {
          dispatch(logout())
        }
      })
      .catch((error) => {
        console.error('Failed to fetch user:', error.message)
        dispatch(logout())
      })
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  )
}

export default App