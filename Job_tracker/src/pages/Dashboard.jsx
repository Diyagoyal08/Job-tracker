 import { useState, useMemo } from 'react'
import { useTheme } from '../context/ThemeContext'
import JobCard from '../components/JobCard'
import useJobs from '../hooks/useJobs'
import useAuth from '../hooks/useAuth'
import useDebounce from '../hooks/useDebounce'
import { getColors } from '../styles/theme'

function Modal({ title, onSubmit, onClose, children, c }) {
  return (
    <div
      style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(15,14,12,0.6)', zIndex: 50, backdropFilter: 'blur(2px)' }}
      onClick={onClose}
    >
      <div
        style={{ background: c.card, borderRadius: '14px', padding: '24px', width: '100%', maxWidth: '400px', margin: '0 16px', border: `1px solid ${c.border}`, boxShadow: isDark => isDark ? 'none' : '0 8px 32px rgba(0,0,0,0.08)' }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 600, letterSpacing: '-0.2px', color: c.text }}>{title}</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: c.textMuted, fontSize: '16px', cursor: 'pointer', padding: '2px 6px', borderRadius: '5px' }}>✕</button>
        </div>
        <form onSubmit={onSubmit}>
          {children}
          <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
            <button type="button" onClick={onClose}
              style={{ flex: 1, padding: '9px', borderRadius: '8px', border: `1px solid ${c.border}`, background: 'none', color: c.textSub, fontSize: '12px', cursor: 'pointer', fontWeight: 500 }}>
              Cancel
            </button>
            <button type="submit"
              style={{ flex: 1, padding: '9px', borderRadius: '8px', border: 'none', background: c.primary, color: c.primaryText, fontSize: '12px', fontWeight: 600, cursor: 'pointer', letterSpacing: '0.1px' }}>
              {title === 'Add Job' ? 'Add job' : 'Save changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Dashboard() {
  const { theme }         = useTheme()
  const { user }          = useAuth()
  const isDark            = theme === 'dark'
  const c                 = getColors(isDark)

  const {
    jobs, isOpen, setIsOpen, editingJob, setEditingJob,
    role, setRole, company, setCompany, location, setLocation,
    status, setStatus, handleSubmit, handleDelete, handleEdit, handleUpdate,
  } = useJobs()

  const [filter, setFilter]      = useState('All')
  const [searchQuery, setSearch] = useState('')
  const debouncedSearch          = useDebounce(searchQuery, 300)

  const filteredJobs = useMemo(() =>
    jobs
      .filter(j => filter === 'All' || j.status === filter)
      .filter(j => {
        const q = debouncedSearch.toLowerCase()
        return !q || j.role?.toLowerCase().includes(q) || j.company?.toLowerCase().includes(q) || j.location?.toLowerCase().includes(q)
      })
  , [jobs, filter, debouncedSearch])

  const recentActivity = useMemo(() =>
    jobs.slice(0, 4).map(job => ({
      text:  job.status === 'Offer'     ? `Offer received from ${job.company}` :
             job.status === 'Interview' ? `Interview scheduled at ${job.company}` :
             job.status === 'Rejected'  ? `Rejected by ${job.company}` :
             `Applied to ${job.company}`,
      color: c.activity[job.status] || c.activity.Applied,
      date:  new Date(job.$createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    }))
  , [jobs, isDark])

  const maxJobs = useMemo(() =>
    Math.max(...Object.keys(c.pipe).map(s => jobs.filter(j => j.status === s).length), 1)
  , [jobs])

  const inputStyle = {
    width: '100%', border: `1px solid ${c.inputBorder}`, borderRadius: '8px',
    padding: '9px 12px', fontSize: '12px', background: c.inputBg,
    color: c.inputText, outline: 'none', fontFamily: 'inherit',
    transition: 'border-color .15s',
  }

  const labelStyle = {
    display: 'block', fontSize: '11px', fontWeight: 550,
    color: c.textSub, marginBottom: '5px', letterSpacing: '0.1px',
  }

  const formFields = (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {[
        { label: 'Role',     value: role,     set: setRole,     placeholder: 'e.g. Frontend Developer', req: true  },
        { label: 'Company',  value: company,  set: setCompany,  placeholder: 'e.g. Google',             req: true  },
        { label: 'Location', value: location, set: setLocation, placeholder: 'e.g. Remote or Bengaluru',req: false },
      ].map(({ label, value, set, placeholder, req }) => (
        <div key={label}>
          <label style={labelStyle}>{label}</label>
          <input type="text" value={value} onChange={e => set(e.target.value)} placeholder={placeholder} required={req} style={inputStyle} />
        </div>
      ))}
      <div>
        <label style={labelStyle}>Status</label>
        <select value={status} onChange={e => setStatus(e.target.value)} style={inputStyle}>
          {["Applied","Interview","Offer","Rejected","Saved"].map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
    </div>
  )

  const statDeltas = {
    Applied:   '↑ 2 this week',
    Interview: '↑ 1 this week',
    Offer:     '🎉 1 new',
    Rejected:  '— no change',
  }

  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', background: c.bg, minHeight: '100%' }}>

      {/* ── Stats ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: '8px' }}>
        {["Applied","Interview","Offer","Rejected"].map(s => (
          <div key={s} style={{ background: c.statBg, border: `1px solid ${c.border}`, borderRadius: '10px', padding: '14px' }}>
            <div style={{ fontSize: '26px', fontWeight: 700, letterSpacing: '-1px', lineHeight: 1, color: c.text, marginBottom: '5px' }}>
              {jobs.filter(j => j.status === s).length}
            </div>
            <div style={{ fontSize: '10px', fontWeight: 550, color: c.textSub, letterSpacing: '0.3px' }}>{s}</div>
            <div style={{ fontSize: '9px', color: c.textMuted, marginTop: '6px' }}>{statDeltas[s]}</div>
          </div>
        ))}
      </div>

      {/* ── Add job button ── */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={() => setIsOpen(true)}
          style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '7px 16px', borderRadius: '8px', border: 'none', background: c.primary, color: c.primaryText, fontSize: '12px', fontWeight: 600, cursor: 'pointer', letterSpacing: '0.1px' }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><path d="M5 1v8M1 5h8"/></svg>
          Add job
        </button>
      </div>

      {/* ── Search ── */}
      <div style={{ position: 'relative' }}>
        <svg style={{ position: 'absolute', left: '11px', top: '50%', transform: 'translateY(-50%)', width: '13px', height: '13px', color: c.textMuted, opacity: 0.5 }} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="7" cy="7" r="5"/><path d="M11 11l3 3"/>
        </svg>
        <input
          type="text"
          placeholder="Search by role, company or location…"
          value={searchQuery}
          onChange={e => setSearch(e.target.value)}
          style={{ ...inputStyle, paddingLeft: '32px' }}
        />
      </div>

      {/* ── Filter pills ── */}
      <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
        {['All','Applied','Interview','Offer','Rejected','Saved'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: '5px 12px', borderRadius: '6px', fontSize: '11px', fontWeight: 500,
              cursor: 'pointer', border: `1px solid ${filter === f ? c.primary : c.pillBorder}`,
              background: filter === f ? c.primary : c.pillBg,
              color: filter === f ? c.primaryText : c.pillText,
              transition: 'all .12s', letterSpacing: '0.1px',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* ── Jobs list ── */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, color: c.text, letterSpacing: '0.1px' }}>
            {filter === 'All' && !debouncedSearch ? 'Recent applications' : `Filtered results`}
          </span>
          <span style={{ fontSize: '10px', color: c.textMuted }}>
            {filteredJobs.length === jobs.length ? `${jobs.length} total` : `${filteredJobs.length} of ${jobs.length}`}
          </span>
        </div>

        {filteredJobs.length === 0 ? (
          <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: '10px', padding: '40px 24px', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', marginBottom: '8px' }}>🗂</div>
            <p style={{ color: c.textSub, fontSize: '13px', marginBottom: '4px' }}>
              {jobs.length === 0 ? 'No jobs tracked yet' : 'Nothing matches your search'}
            </p>
            {jobs.length === 0 && (
              <button onClick={() => setIsOpen(true)} style={{ marginTop: '10px', background: 'none', border: 'none', color: c.primary, fontSize: '12px', cursor: 'pointer', fontWeight: 500, textDecoration: 'underline' }}>
                Add your first job
              </button>
            )}
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {filteredJobs.map(job => (
              <JobCard
                key={job.$id}
                job={job}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isDark={isDark}
                c={c}
                statusColors={c.status}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Pipeline + Activity ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>

        {/* Pipeline */}
        <div style={{ background: c.panelBg, border: `1px solid ${c.border}`, borderRadius: '10px', padding: '16px' }}>
          <p style={{ fontSize: '10px', fontWeight: 700, color: c.textMuted, marginBottom: '14px', letterSpacing: '0.7px', textTransform: 'uppercase' }}>Pipeline</p>
          {Object.entries(c.pipe).map(([label, color]) => {
            const count = jobs.filter(j => j.status === label).length
            const pct   = Math.round((count / maxJobs) * 100)
            return (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '9px' }}>
                <span style={{ fontSize: '10px', color: c.textSub, width: '58px', flexShrink: 0 }}>{label}</span>
                <div style={{ flex: 1, height: '4px', borderRadius: '2px', background: c.pipeTrack, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${pct || 0}%`, background: color, borderRadius: '2px', transition: 'width .4s ease' }} />
                </div>
                <span style={{ fontSize: '10px', fontWeight: 600, color: c.text, width: '14px', textAlign: 'right', flexShrink: 0 }}>{count}</span>
              </div>
            )
          })}
        </div>

        {/* Activity */}
        <div style={{ background: c.panelBg, border: `1px solid ${c.border}`, borderRadius: '10px', padding: '16px' }}>
          <p style={{ fontSize: '10px', fontWeight: 700, color: c.textMuted, marginBottom: '14px', letterSpacing: '0.7px', textTransform: 'uppercase' }}>Activity</p>
          {recentActivity.length === 0 ? (
            <p style={{ fontSize: '12px', color: c.textMuted }}>Nothing yet</p>
          ) : (
            recentActivity.map((act, i) => (
              <div key={i} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', paddingBottom: '9px', marginBottom: '9px', borderBottom: i < recentActivity.length - 1 ? `1px solid ${c.border}` : 'none' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: act.color, marginTop: '5px', flexShrink: 0 }} />
                <div>
                  <p style={{ fontSize: '11px', color: c.text, lineHeight: 1.4 }}>{act.text}</p>
                  <p style={{ fontSize: '9px', color: c.textMuted, marginTop: '2px' }}>{act.date}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {isOpen && (
        <Modal title="Add Job" onSubmit={handleSubmit} onClose={() => setIsOpen(false)} c={c}>
          {formFields}
        </Modal>
      )}
      {editingJob && (
        <Modal title="Edit Job" onSubmit={handleUpdate} onClose={() => setEditingJob(null)} c={c}>
          {formFields}
        </Modal>
      )}
    </div>
  )
}

export default Dashboard