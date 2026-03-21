 import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login, logout , setLoading } from './store/slices/authSlice'
import authService from './appwrite/auth'
import Dashboard from './pages/Dashboard'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const dispatch = useDispatch()
 useEffect(() => {
  authService.getCurrentUser()
    .then((userData) => {
      console.log("getCurrentUser result:", userData) // ← add this
      if (userData) {
        dispatch(login(userData))
      } else {
        dispatch(logout())
      }
    })
    .finally(() => {
      dispatch(setLoading(false))
    })
}, [])

  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
         <Route path="/" element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }/> 
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </div>
  )
}

export default App