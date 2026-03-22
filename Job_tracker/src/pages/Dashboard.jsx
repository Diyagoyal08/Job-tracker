 import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../store/slices/authSlice'
import { setJobs, addJob, removeJob, updateJob } from '../store/slices/jobSlice'
import authService from '../appwrite/auth'
import jobService from '../appwrite/jobs'
import { useTheme } from '../context/ThemeContext'

function Dashboard() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const jobs     = useSelector(state => state.jobs.jobs)
  const user     = useSelector(state => state.auth.userData)
  const { theme, toggleTheme } = useTheme()

  const [isOpen, setIsOpen]         = useState(false)
  const [editingJob, setEditingJob] = useState(null)
  const [role, setRole]             = useState("")
  const [company, setCompany]       = useState("")
  const [location, setLocation]     = useState("")
  const [status, setStatus]         = useState("Applied")

  const isDark = theme === 'dark'

  const c = {
    dash:        isDark ? '#000000' : '#f5f4ee',
    sb:          isDark ? '#0a0a0a' : '#eeeee6',
    border:      isDark ? '#1a1a1a' : '#ddd8b8',
    topbar:      isDark ? '#0a0a0a' : '#eeeee6',
    card:        isDark ? '#0a0a0a' : '#ffffff',
    nav1bg:      isDark ? '#1a1a2e' : '#ddd8b8',
    nav1c:       isDark ? '#ddd8b8' : '#542E71',
    navC:        isDark ? '#6A66A3' : '#84A9C0',
    logoC:       isDark ? '#ddd8b8' : '#542E71',
    title:       isDark ? '#ddd8b8' : '#542E71',
    sub:         isDark ? '#6A66A3' : '#84A9C0',
    text:        isDark ? '#f0ede0' : '#333333',
    btnBg:       isDark ? '#111111' : '#eeeee6',
    btnBorder:   isDark ? '#222222' : '#ddd8b8',
    btnC:        isDark ? '#84A9C0' : '#6A66A3',
    statBg:      isDark ? '#0a0a0a' : '#eeeee6',
    statLbl:     isDark ? '#6A66A3' : '#84A9C0',
    statNum:     isDark ? '#ddd8b8' : '#542E71',
    avBg:        isDark ? '#1a1a2e' : '#e8e6f5',
    avC:         isDark ? '#84A9C0' : '#542E71',
    jco:         isDark ? '#6A66A3' : '#84A9C0',
    jdate:       isDark ? '#333333' : '#B3CBB9',
    jbtn:        isDark ? '#333333' : '#B3CBB9',
    panelTitle:  isDark ? '#6A66A3' : '#84A9C0',
    pipeLbl:     isDark ? '#ddd8b8' : '#542E71',
    pipeWrap:    isDark ? '#1a1a1a' : '#ddd8b8',
    pipeCnt:     isDark ? '#ddd8b8' : '#542E71',
    actText:     isDark ? '#f0ede0' : '#444444',
    actTime:     isDark ? '#6A66A3' : '#84A9C0',
    input:       isDark ? '#111111' : '#ffffff',
    inputText:   isDark ? '#f0ede0' : '#333333',
  }

  const statusColors = {
    Applied:   { bg: isDark ? '#1a1a2e' : '#e8e6f5', text: isDark ? '#84A9C0' : '#3d3a7a' },
    Interview: { bg: isDark ? '#0d1e2e' : '#ddeaf4', text: isDark ? '#84A9C0' : '#2c6080' },
    Offer:     { bg: isDark ? '#0d2014' : '#e4f0e6', text: isDark ? '#B3CBB9' : '#2d6b35' },
    Rejected:  { bg: isDark ? '#2e0a0a' : '#ffebee', text: isDark ? '#ef9a9a' : '#c62828' },
    Saved:     { bg: isDark ? '#1a1a1a' : '#f5f5f5', text: isDark ? '#888888' : '#616161' },
  }

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await jobService.getJobs()
        dispatch(setJobs(response.documents))
      } catch (error) { console.error(error) }
    }
    fetchJobs()
  }, [dispatch])

  const handleLogout = async () => {
    try {
      await authService.logout()
      dispatch(logout())
      navigate('/login')
    } catch (error) { console.error(error) }
  }

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

  const inputStyle = {
    width: '100%',
    border: `1px solid ${c.border}`,
    borderRadius: '10px',
    padding: '10px 14px',
    fontSize: '13px',
    background: c.input,
    color: c.inputText,
    outline: 'none',
  }

  const formFields = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {[
        { label: 'Role', value: role, set: setRole, placeholder: 'e.g. Frontend Developer', req: true },
        { label: 'Company', value: company, set: setCompany, placeholder: 'e.g. Google', req: true },
        { label: 'Location', value: location, set: setLocation, placeholder: 'e.g. Remote', req: false },
      ].map(({ label, value, set, placeholder, req }) => (
        <div key={label}>
          <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: c.sub, marginBottom: '5px' }}>{label}</label>
          <input type="text" value={value} onChange={e => set(e.target.value)} placeholder={placeholder} required={req} style={inputStyle} />
        </div>
      ))}
      <div>
        <label style={{ display: 'block', fontSize: '11px', fontWeight: '600', color: c.sub, marginBottom: '5px' }}>Status</label>
        <select value={status} onChange={e => setStatus(e.target.value)} style={inputStyle}>
          {["Applied","Interview","Offer","Rejected","Saved"].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
    </div>
  )

  const Modal = ({ title, onSubmit, onClose }) => (
    <div
      style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 50 }}
      onClick={onClose}
    >
      <div
        style={{ background: c.card, borderRadius: '20px', padding: '24px', width: '100%', maxWidth: '420px', margin: '0 16px', border: `1px solid ${c.border}` }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '700', color: c.title }}>{title}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: c.sub, fontSize: '18px', cursor: 'pointer' }}>✕</button>
        </div>
        <form onSubmit={onSubmit}>
          {formFields}
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button type="button" onClick={onClose}
              style={{ flex: 1, padding: '10px', borderRadius: '10px', border: `1px solid ${c.border}`, background: 'none', color: c.sub, fontSize: '13px', cursor: 'pointer' }}>
              Cancel
            </button>
            <button type="submit"
              style={{ flex: 1, padding: '10px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg,#6A66A3,#542E71)', color: 'white', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>
              {title === 'Add Job' ? 'Add Job' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )

  const recentActivity = jobs.slice(0, 4).map(job => ({
    text: job.status === 'Offer'     ? `Got an offer from ${job.company}` :
          job.status === 'Interview' ? `Interview scheduled — ${job.company}` :
          job.status === 'Rejected'  ? `Rejected by ${job.company}` :
          `Applied to ${job.company}`,
    color: job.status === 'Offer'     ? '#B3CBB9' :
           job.status === 'Interview' ? '#84A9C0' :
           job.status === 'Rejected'  ? '#542E71' : '#6A66A3',
    date: new Date(job.$createdAt).toLocaleDateString()
  }))

  const maxJobs = Math.max(...["Applied","Interview","Offer","Rejected","Saved"].map(s => jobs.filter(j => j.status === s).length), 1)

  return (
    <div style={{ display: 'flex', height: '100vh', background: c.dash, fontFamily: 'system-ui, sans-serif' }}>

      {/* Sidebar */}
      <div style={{ width: '200px', flexShrink: 0, background: c.sb, borderRight: `1px solid ${c.border}`, display: 'flex', flexDirection: 'column', padding: '20px 0' }}>
        <div style={{ padding: '0 16px 20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'linear-gradient(135deg,#6A66A3,#542E71)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700', fontSize: '12px' }}>JT</div>
          <span style={{ fontSize: '14px', fontWeight: '700', color: c.logoC }}>JobTrack</span>
        </div>

        {[
          { icon: '◈', label: 'Dashboard', active: true },
          { icon: '◉', label: 'All Jobs',  active: false },
          { icon: '◎', label: 'Saved',     active: false },
          { icon: '◷', label: 'Interviews',active: false },
        ].map(({ icon, label, active }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 16px', margin: '1px 8px', borderRadius: '10px', background: active ? c.nav1bg : 'none', color: active ? c.nav1c : c.navC, fontSize: '12px', fontWeight: active ? '600' : '400', cursor: 'pointer' }}>
            <span>{icon}</span>{label}
          </div>
        ))}

        <div style={{ marginTop: 'auto', padding: '0 8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 16px', borderRadius: '10px', color: c.navC, fontSize: '12px', cursor: 'pointer' }}>
            <span>◯</span>{user?.name?.split(' ')[0]}
          </div>
        </div>
      </div>

      {/* Main scrollable */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>

        {/* Sticky navbar */}
        <div style={{ background: c.topbar, borderBottom: `1px solid ${c.border}`, padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
          <div>
            <h1 style={{ fontSize: '16px', fontWeight: '700', color: c.title }}>Dashboard</h1>
            <p style={{ fontSize: '11px', color: c.sub, marginTop: '1px' }}>Welcome back, {user?.name} ✨</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={() => setIsOpen(true)}
              style={{ background: 'linear-gradient(135deg,#6A66A3,#542E71)', color: 'white', border: 'none', padding: '8px 18px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
              + Add Job
            </button>
            <button onClick={toggleTheme}
              style={{ background: c.btnBg, border: `1px solid ${c.btnBorder}`, color: c.btnC, padding: '8px 13px', borderRadius: '20px', fontSize: '12px', cursor: 'pointer' }}>
              {isDark ? '☀️' : '🌙'}
            </button>
            <button onClick={handleLogout}
              style={{ background: c.btnBg, border: `1px solid ${c.btnBorder}`, color: c.btnC, padding: '8px 13px', borderRadius: '20px', fontSize: '12px', cursor: 'pointer' }}>
              Logout
            </button>
          </div>
        </div>

        <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '10px' }}>
            {["Applied","Interview","Offer","Rejected"].map(s => (
              <div key={s} style={{ background: c.statBg, border: `1px solid ${c.border}`, borderRadius: '14px', padding: '14px' }}>
                <p style={{ fontSize: '10px', color: c.statLbl, marginBottom: '4px', fontWeight: '500' }}>{s}</p>
                <p style={{ fontSize: '22px', fontWeight: '700', color: c.statNum }}>{jobs.filter(j => j.status === s).length}</p>
              </div>
            ))}
          </div>

          {/* Jobs list */}
          <div>
            <p style={{ fontSize: '12px', fontWeight: '600', color: c.title, marginBottom: '10px' }}>
              Recent applications · {jobs.length} total
            </p>
            {jobs.length === 0 ? (
              <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
                <p style={{ color: c.sub, fontSize: '13px' }}>No jobs yet</p>
                <button onClick={() => setIsOpen(true)}
                  style={{ marginTop: '10px', background: 'none', border: 'none', color: '#6A66A3', fontSize: '13px', cursor: 'pointer', textDecoration: 'underline' }}>
                  Add your first job
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {jobs.map(job => {
                  const sc = statusColors[job.status] || statusColors.Saved
                  return (
                    <div key={job.$id} style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: '14px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: c.avBg, color: c.avC, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '13px', flexShrink: 0 }}>
                        {job.company?.[0]?.toUpperCase()}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: '13px', fontWeight: '600', color: c.text }}>{job.role}</p>
                        <p style={{ fontSize: '11px', color: c.jco, marginTop: '2px' }}>{job.company}{job.location ? ` · ${job.location}` : ''}</p>
                      </div>
                      <span style={{ fontSize: '10px', fontWeight: '600', padding: '3px 10px', borderRadius: '20px', background: sc.bg, color: sc.text, flexShrink: 0 }}>
                        {job.status}
                      </span>
                      <p style={{ fontSize: '10px', color: c.jdate, flexShrink: 0 }}>
                        {new Date(job.$createdAt).toLocaleDateString()}
                      </p>
                      <button onClick={() => handleEdit(job)} style={{ background: 'none', border: 'none', color: c.jbtn, fontSize: '14px', cursor: 'pointer', flexShrink: 0 }}>✎</button>
                      <button onClick={() => handleDelete(job.$id)} style={{ background: 'none', border: 'none', color: c.jbtn, fontSize: '14px', cursor: 'pointer', flexShrink: 0 }}>✕</button>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Pipeline + Activity */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>

            {/* Pipeline */}
            <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: '16px', padding: '18px' }}>
              <p style={{ fontSize: '10px', fontWeight: '700', color: c.panelTitle, marginBottom: '14px', letterSpacing: '0.5px' }}>PIPELINE</p>
              {[
                { label: 'Applied',   color: '#6A66A3' },
                { label: 'Interview', color: '#84A9C0' },
                { label: 'Offer',     color: '#B3CBB9' },
                { label: 'Rejected',  color: '#542E71' },
                { label: 'Saved',     color: '#ddd8b8' },
              ].map(({ label, color }) => {
                const count = jobs.filter(j => j.status === label).length
                const pct   = Math.round((count / maxJobs) * 100)
                return (
                  <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <span style={{ fontSize: '10px', color: c.pipeLbl, width: '60px', flexShrink: 0, fontWeight: '500' }}>{label}</span>
                    <div style={{ flex: 1, height: '5px', borderRadius: '3px', background: c.pipeWrap, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pct || 0}%`, background: color, borderRadius: '3px', transition: 'width .4s' }} />
                    </div>
                    <span style={{ fontSize: '10px', fontWeight: '700', color: c.pipeCnt, width: '16px', textAlign: 'right' }}>{count}</span>
                  </div>
                )
              })}
            </div>

            {/* Recent Activity */}
            <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: '16px', padding: '18px' }}>
              <p style={{ fontSize: '10px', fontWeight: '700', color: c.panelTitle, marginBottom: '14px', letterSpacing: '0.5px' }}>RECENT ACTIVITY</p>
              {recentActivity.length === 0 ? (
                <p style={{ fontSize: '12px', color: c.sub }}>No activity yet</p>
              ) : (
                recentActivity.map((act, i) => (
                  <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', paddingBottom: '10px', marginBottom: '10px', borderBottom: i < recentActivity.length - 1 ? `1px solid ${c.border}` : 'none' }}>
                    <div style={{ width: '7px', height: '7px', borderRadius: '50%', background: act.color, marginTop: '4px', flexShrink: 0 }} />
                    <div>
                      <p style={{ fontSize: '12px', color: c.actText }}>{act.text}</p>
                      <p style={{ fontSize: '10px', color: c.actTime, marginTop: '2px' }}>{act.date}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>
      </div>

      {isOpen    && <Modal title="Add Job"  onSubmit={handleSubmit} onClose={() => setIsOpen(false)} />}
      {editingJob && <Modal title="Edit Job" onSubmit={handleUpdate} onClose={() => setEditingJob(null)} />}

    </div>
  )
}

export default Dashboard