import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'
import JobCard from '../components/JobCard'
import useJobs from '../hooks/useJobs'
import useDebounce from '../hooks/useDebounce'

function Modal({ title, onSubmit, onClose, children, c }) {
  return (
    <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 50 }} onClick={onClose}>
      <div style={{ background: c.card, borderRadius: '20px', padding: '24px', width: '100%', maxWidth: '420px', margin: '0 16px', border: `1px solid ${c.border}` }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '700', color: c.title }}>{title}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: c.sub, fontSize: '18px', cursor: 'pointer' }}>✕</button>
        </div>
        <form onSubmit={onSubmit}>
          {children}
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button type="button" onClick={onClose} style={{ flex: 1, padding: '10px', borderRadius: '10px', border: `1px solid ${c.border}`, background: 'none', color: c.sub, fontSize: '13px', cursor: 'pointer' }}>Cancel</button>
            <button type="submit" style={{ flex: 1, padding: '10px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg,#6A66A3,#542E71)', color: 'white', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>{title === 'Add Job' ? 'Add Job' : 'Save Changes'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

function AllJobsPage() {
  const { theme } = useTheme()
  const { jobs, isOpen, setIsOpen, editingJob, setEditingJob, role, setRole, company, setCompany, location, setLocation, status, setStatus, handleSubmit, handleDelete, handleEdit, handleUpdate } = useJobs()

  const [filter, setFilter]      = useState('All')
  const [searchQuery, setSearch] = useState('')
  const debouncedSearch          = useDebounce(searchQuery, 300)
  const isDark                   = theme === 'dark'

  const c = {
    bg: isDark ? '#000000' : '#f5f4ee', border: isDark ? '#1a1a1a' : '#ddd8b8',
    card: isDark ? '#0a0a0a' : '#ffffff', title: isDark ? '#ddd8b8' : '#542E71',
    sub: isDark ? '#6A66A3' : '#84A9C0', text: isDark ? '#f0ede0' : '#333333',
    statBg: isDark ? '#0a0a0a' : '#eeeee6', statLbl: isDark ? '#6A66A3' : '#84A9C0',
    statNum: isDark ? '#ddd8b8' : '#542E71', avBg: isDark ? '#1a1a2e' : '#e8e6f5',
    avC: isDark ? '#84A9C0' : '#542E71', jco: isDark ? '#6A66A3' : '#84A9C0',
    jdate: isDark ? '#333333' : '#B3CBB9', jbtn: isDark ? '#333333' : '#B3CBB9',
    input: isDark ? '#111111' : '#ffffff', inputText: isDark ? '#f0ede0' : '#333333',
  }

  const statusColors = {
    Applied:   { bg: isDark ? '#1a1a2e' : '#e8e6f5', text: isDark ? '#84A9C0' : '#3d3a7a' },
    Interview: { bg: isDark ? '#0d1e2e' : '#ddeaf4', text: isDark ? '#84A9C0' : '#2c6080' },
    Offer:     { bg: isDark ? '#0d2014' : '#e4f0e6', text: isDark ? '#B3CBB9' : '#2d6b35' },
    Rejected:  { bg: isDark ? '#2e0a0a' : '#ffebee', text: isDark ? '#ef9a9a' : '#c62828' },
    Saved:     { bg: isDark ? '#1a1a1a' : '#f5f5f5', text: isDark ? '#888888' : '#616161' },
  }

  const filteredJobs = jobs
    .filter(j => filter === 'All' || j.status === filter)
    .filter(j => {
      const q = debouncedSearch.toLowerCase()
      return j.role?.toLowerCase().includes(q) || j.company?.toLowerCase().includes(q) || j.location?.toLowerCase().includes(q)
    })

  const inputStyle = { width: '100%', border: `1px solid ${c.border}`, borderRadius: '10px', padding: '10px 14px', fontSize: '13px', background: c.input, color: c.inputText, outline: 'none' }

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

  return (
    <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: '20px', background: c.bg, minHeight: '100%' }}>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button onClick={() => setIsOpen(true)} style={{ background: 'linear-gradient(135deg,#6A66A3,#542E71)', color: 'white', border: 'none', padding: '8px 18px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>+ Add Job</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="text" placeholder="Search by role, company or location..." value={searchQuery} onChange={e => setSearch(e.target.value)} style={{ width: '100%', padding: '10px 16px', borderRadius: '12px', border: `1px solid ${c.border}`, background: c.card, color: c.text, fontSize: '13px', outline: 'none' }} />
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['All','Applied','Interview','Offer','Rejected','Saved'].map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: '5px 14px', borderRadius: '20px', border: `1px solid ${filter === f ? '#6A66A3' : c.border}`, background: filter === f ? '#6A66A3' : 'none', color: filter === f ? 'white' : c.sub, fontSize: '11px', fontWeight: filter === f ? '600' : '400', cursor: 'pointer' }}>{f}</button>
          ))}
        </div>
      </div>

      <div>
        <p style={{ fontSize: '12px', fontWeight: '600', color: c.title, marginBottom: '10px' }}>
          {filteredJobs.length === jobs.length ? `${jobs.length} jobs total` : `Showing ${filteredJobs.length} of ${jobs.length} jobs`}
        </p>
        {filteredJobs.length === 0 ? (
          <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
            <p style={{ color: c.sub, fontSize: '13px' }}>{jobs.length === 0 ? 'No jobs yet' : 'No jobs match your search'}</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {filteredJobs.map(job => (
              <JobCard key={job.$id} job={job} onEdit={handleEdit} onDelete={handleDelete} isDark={isDark} c={c} statusColors={statusColors} />
            ))}
          </div>
        )}
      </div>

      {isOpen && <Modal title="Add Job" onSubmit={handleSubmit} onClose={() => setIsOpen(false)} c={c}>{formFields}</Modal>}
      {editingJob && <Modal title="Edit Job" onSubmit={handleUpdate} onClose={() => setEditingJob(null)} c={c}>{formFields}</Modal>}
    </div>
  )
}

export default AllJobsPage