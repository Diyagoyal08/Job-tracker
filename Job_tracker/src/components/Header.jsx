import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../store/slices/authSlice'
import authService from '../appwrite/auth'

function Header() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await authService.logout()
    dispatch(logout())
    navigate('/login')
  }

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-blue-600">Job Tracker</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-700 text-white text-sm font-medium py-2 px-4 rounded"
      >
        Logout
      </button>
    </header>
  )
}

export default Header