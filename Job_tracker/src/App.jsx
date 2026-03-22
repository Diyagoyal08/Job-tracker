 import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login, logout, setLoading } from './store/slices/authSlice'
import authService from './appwrite/auth'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import AllJobsPage from './pages/AllJobsPage'
import SavedPage from './pages/SavedPage'
import InterviewsPage from './pages/InterviewsPage'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then(userData => {
        if (userData) dispatch(login(userData))
        else dispatch(logout())
      })
      .finally(() => dispatch(setLoading(false)))
  }, [])

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login"  element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />

      {/* Protected routes — all share the Layout */}
      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        <Route index        element={<Dashboard />}     />
        <Route path="all-jobs"    element={<AllJobsPage />}    />
        <Route path="saved"       element={<SavedPage />}      />
        <Route path="interviews"  element={<InterviewsPage />} />
        <Route path="profile"     element={<ProfilePage />}    />
      </Route>
    </Routes>
  )
}

export default App