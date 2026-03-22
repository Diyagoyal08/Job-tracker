 import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../store/slices/authSlice'
import authService from '../appwrite/auth'

function useAuth() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user     = useSelector(state => state.auth.userData)

  const handleLogout = async () => {
    try {
      await authService.logout()
      dispatch(logout())
      navigate('/login')
    } catch (error) { console.error(error) }
  }

  return {
    user,
    handleLogout,
  }
}

export default useAuth