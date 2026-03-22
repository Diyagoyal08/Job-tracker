 import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../store/slices/authSlice'
import { setJobs, addJob, removeJob, updateJob } from '../store/slices/jobSlice'
import authService from '../appwrite/auth'
import jobService from '../appwrite/jobs'

function Dashboard() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const jobs     = useSelector(state => state.jobs.jobs)
  const user     = useSelector(state => state.auth.userData)

  const [isOpen, setIsOpen]         = useState(false)
  const [editingJob, setEditingJob] = useState(null)
  const [role, setRole]             = useState("")
  const [company, setCompany]       = useState("")
  const [location, setLocation]     = useState("")
  const [status, setStatus]         = useState("Applied")

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

  const handleLogout = async () => {
    try {
      await authService.logout()
      dispatch(logout())
      navigate('/login')
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newJob = await jobService.createJob(user.$id, {
        role, company, location, status,
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

  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure?")) return
    try {
      await jobService.deleteJob(jobId)
      dispatch(removeJob(jobId))
    } catch (error) {
      console.error("Failed to delete job:", error)
      alert("Failed to delete job: " + error.message)
    }
  }

  const handleEdit = (job) => {
    setEditingJob(job)
    setRole(job.role)
    setCompany(job.company)
    setLocation(job.location || "")
    setStatus(job.status)
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const updated = await jobService.updateJob(editingJob.$id, {
        role, company, location, status
      })
      dispatch(updateJob(updated))
      setEditingJob(null)
      setRole("")
      setCompany("")
      setLocation("")
      setStatus("Applied")
    } catch (error) {
      console.error("Failed to update job:", error)
      alert("Failed to update job: " + error.message)
    }
  }

  const statusColors = {
    Applied:   "bg-blue-50 text-blue-700",
    Interview: "bg-yellow-50 text-yellow-700",
    Offer:     "bg-green-50 text-green-700",
    Rejected:  "bg-red-50 text-red-700",
    Saved:     "bg-gray-50 text-gray-700",
  }

  const formFields = (
    <div className="flex flex-col gap-3">
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">Role</label>
        <input
          type="text"
          value={role}
          onChange={e => setRole(e.target.value)}
          placeholder="e.g. Frontend Developer"
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">Company</label>
        <input
          type="text"
          value={company}
          onChange={e => setCompany(e.target.value)}
          placeholder="e.g. Google"
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">Location</label>
        <input
          type="text"
          value={location}
          onChange={e => setLocation(e.target.value)}
          placeholder="e.g. Remote or Bengaluru"
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Offer">Offer</option>
          <option value="Rejected">Rejected</option>
          <option value="Saved">Saved</option>
        </select>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <div className="bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Job Tracker</h1>
          <p className="text-xs text-gray-400">Welcome, {user?.name}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            + Add Job
          </button>
          <button
            onClick={handleLogout}
            className="border border-gray-200 text-gray-600 hover:bg-gray-50 px-4 py-2 rounded-lg text-sm"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Stats row */}
      <div className="px-6 py-4 grid grid-cols-4 gap-3">
        {["Applied", "Interview", "Offer", "Rejected"].map(s => (
          <div key={s} className="bg-white rounded-xl border border-gray-100 p-4">
            <p className="text-xs text-gray-400 mb-1">{s}</p>
            <p className="text-2xl font-bold text-gray-900">
              {jobs.filter(j => j.status === s).length}
            </p>
          </div>
        ))}
      </div>

      {/* Jobs list */}
      <div className="px-6 pb-6">
        <p className="text-sm font-medium text-gray-500 mb-3">
          {jobs.length} job{jobs.length !== 1 ? "s" : ""} tracked
        </p>

        {jobs.length === 0 ? (
          <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
            <p className="text-gray-400 text-sm">No jobs yet</p>
            <button
              onClick={() => setIsOpen(true)}
              className="mt-3 text-blue-500 text-sm hover:underline"
            >
              Add your first job
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {jobs.map(job => (
              <div
                key={job.$id}
                className="bg-white rounded-xl border border-gray-100 px-5 py-4 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-sm shrink-0">
                  {job.company?.[0]?.toUpperCase()}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm">{job.role}</p>
                  <p className="text-gray-400 text-xs mt-0.5">
                    {job.company}{job.location ? ` · ${job.location}` : ""}
                  </p>
                </div>

                <span className={`text-xs font-medium px-3 py-1 rounded-full shrink-0 ${statusColors[job.status] || "bg-gray-50 text-gray-600"}`}>
                  {job.status}
                </span>

                <p className="text-xs text-gray-300 shrink-0">
                  {new Date(job.$createdAt).toLocaleDateString()}
                </p>

                <button
                  onClick={() => handleEdit(job)}
                  className="text-gray-300 hover:text-blue-400 text-sm shrink-0 transition-colors"
                >
                  ✎
                </button>

                <button
                  onClick={() => handleDelete(job.$id)}
                  className="text-gray-300 hover:text-red-400 text-sm shrink-0 transition-colors"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Job Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md mx-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-bold text-gray-900">Add Job</h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-gray-500 text-xl">✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              {formFields}
              <div className="flex gap-3 mt-4">
                <button type="button" onClick={() => setIsOpen(false)} className="flex-1 border border-gray-200 text-gray-500 py-2.5 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium">Add Job</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Job Modal */}
      {editingJob && (
        <div
          className="fixed inset-0 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
          onClick={() => setEditingJob(null)}
        >
          <div
            className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md mx-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-bold text-gray-900">Edit Job</h2>
              <button onClick={() => setEditingJob(null)} className="text-gray-300 hover:text-gray-500 text-xl">✕</button>
            </div>
            <form onSubmit={handleUpdate}>
              {formFields}
              <div className="flex gap-3 mt-4">
                <button type="button" onClick={() => setEditingJob(null)} className="flex-1 border border-gray-200 text-gray-500 py-2.5 rounded-lg text-sm hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}

export default Dashboard