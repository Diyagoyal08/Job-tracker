 import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setJobs, addJob, removeJob, updateJob } from '../store/slices/jobSlice'
import jobService from '../appwrite/jobs'

function useJobs() {
  const dispatch = useDispatch()
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
      } catch (error) { console.error(error) }
    }
    fetchJobs()
  }, [dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const newJob = await jobService.createJob(user.$id, { role, company, location, status })
      dispatch(addJob(newJob))
      setIsOpen(false)
      setRole(""); setCompany(""); setLocation(""); setStatus("Applied")
    } catch (error) { alert("Failed to add job: " + error.message) }
  }

  const handleDelete = async (jobId) => {
    if (!window.confirm("Are you sure?")) return
    try {
      await jobService.deleteJob(jobId)
      dispatch(removeJob(jobId))
    } catch (error) { alert("Failed to delete: " + error.message) }
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
      const updated = await jobService.updateJob(editingJob.$id, { role, company, location, status })
      dispatch(updateJob(updated))
      setEditingJob(null)
      setRole(""); setCompany(""); setLocation(""); setStatus("Applied")
    } catch (error) { alert("Failed to update: " + error.message) }
  }

  return {
    jobs,
    user,
    isOpen,        setIsOpen,
    editingJob,    setEditingJob,
    role,          setRole,
    company,       setCompany,
    location,      setLocation,
    status,        setStatus,
    handleSubmit,
    handleDelete,
    handleEdit,
    handleUpdate,
  }
}

export default useJobs