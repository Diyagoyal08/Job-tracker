 import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../store/slices/authSlice'
import { setJobs, addJob } from '../store/slices/jobSlice'
import authService from '../appwrite/auth'
import jobService from '../appwrite/jobs'

function Dashboard() {
  const dispatch  = useDispatch()
  const navigate  = useNavigate()
  const jobs      = useSelector(state => state.jobs.jobs)
  const user      = useSelector(state => state.auth.userData)

  console.log("Current user:", user)

  const [isOpen, setIsOpen]     = useState(false)
  const [role, setRole]         = useState("")
  const [company, setCompany]   = useState("")
  const [location, setLocation] = useState("")
  const [status, setStatus]     = useState("Applied")

  const handleLogout = async () => {
    try {
      await authService.logout()
      dispatch(logout())
      navigate('/login')
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await jobService.getJobs()
        dispatch(setJobs(response.documents))
      } catch (error) {
        console.error(error)
      }
    }
    fetchJobs()
  }, [dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newJob = await jobService.createJob(user.$id, {
        role,
        company,
        location,
        status,
      })
      dispatch(addJob(newJob))
      setIsOpen(false)
      setRole("")
      setCompany("")
      setLocation("")
      setStatus("Applied")
    } catch (error) {
      console.error("Failed to add job:", error)
      alert("Failed to add job: " + error.message)
    }
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Add Job
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {jobs.length === 0 ? (
          <p className="text-gray-500">No jobs yet. Add your first one!</p>
        ) : (
          jobs.map(job => (
            <div key={job.$id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <p className="font-medium text-gray-900">{job.role}</p>
              <p className="text-gray-500 text-sm">{job.company} · {job.location}</p>
              <p className="text-blue-500 text-sm mt-1">{job.status}</p>
            </div>
          ))
        )}
      </div>
      

      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md mx-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Add Job</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <input
                  type="text"
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                <input
                  type="text"
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={e => setLocation(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                  className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Saved">Saved</option>
                </select>
              </div>
              <div className="flex gap-3 mt-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 border border-gray-200 text-gray-600 py-2 rounded-lg text-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-medium"
                >
                  Add Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
    </div>
  )
}

export default Dashboard
 