 function JobCard({ job, onEdit, onDelete, isDark, c, statusColors }) {
  const sc = statusColors[job.status] || statusColors.Saved

  return (
    <div
      style={{
        background: c.card,
        border: `1px solid ${c.border}`,
        borderRadius: '9px',
        padding: '11px 13px',
        display: 'flex',
        alignItems: 'center',
        gap: '11px',
        cursor: 'pointer',
        transition: 'border-color .12s',
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = isDark ? '#3a352e' : '#d4ccc0'}
      onMouseLeave={e => e.currentTarget.style.borderColor = c.border}
    >
      {/* Avatar */}
      <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: c.jobAvBg, color: c.jobAvText, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '12px', flexShrink: 0 }}>
        {job.company?.[0]?.toUpperCase()}
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: '12px', fontWeight: 600, color: c.text, letterSpacing: '-0.1px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{job.role}</p>
        <p style={{ fontSize: '10px', color: c.textSub, marginTop: '1px' }}>
          {job.company}{job.location ? ` · ${job.location}` : ''}
        </p>
      </div>

      {/* Badge */}
      <span style={{ fontSize: '9px', fontWeight: 600, padding: '3px 8px', borderRadius: '5px', background: sc.bg, color: sc.text, flexShrink: 0, letterSpacing: '0.2px' }}>
        {job.status}
      </span>

      {/* Date */}
      <p style={{ fontSize: '9px', color: c.textMuted, flexShrink: 0 }}>
        {new Date(job.$createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
      </p>

      {/* Actions — visible on hover via CSS would need a class, so use opacity trick */}
      <div style={{ display: 'flex', gap: '2px', flexShrink: 0 }}>
        <button
          onClick={e => { e.stopPropagation(); onEdit(job) }}
          style={{ background: 'none', border: 'none', color: c.textMuted, fontSize: '12px', cursor: 'pointer', padding: '3px 5px', borderRadius: '4px' }}
          title="Edit"
        >✎</button>
        <button
          onClick={e => { e.stopPropagation(); onDelete(job.$id) }}
          style={{ background: 'none', border: 'none', color: c.textMuted, fontSize: '12px', cursor: 'pointer', padding: '3px 5px', borderRadius: '4px' }}
          title="Delete"
        >✕</button>
      </div>
    </div>
  )
}

export default JobCard