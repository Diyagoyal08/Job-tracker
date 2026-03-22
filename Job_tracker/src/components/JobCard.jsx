 function JobCard({ job, onEdit, onDelete, isDark, c, statusColors }) {
  const sc = statusColors[job.status] || statusColors.Saved

  return (
    <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: '14px', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>

      {/* Company initial avatar */}
      <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: c.avBg, color: c.avC, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '13px', flexShrink: 0 }}>
        {job.company?.[0]?.toUpperCase()}
      </div>

      {/* Job info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: '13px', fontWeight: '600', color: c.text }}>{job.role}</p>
        <p style={{ fontSize: '11px', color: c.jco, marginTop: '2px' }}>
          {job.company}{job.location ? ` · ${job.location}` : ''}
        </p>
      </div>

      {/* Status badge */}
      <span style={{ fontSize: '10px', fontWeight: '600', padding: '3px 10px', borderRadius: '20px', background: sc.bg, color: sc.text, flexShrink: 0 }}>
        {job.status}
      </span>

      {/* Date */}
      <p style={{ fontSize: '10px', color: c.jdate, flexShrink: 0 }}>
        {new Date(job.$createdAt).toLocaleDateString()}
      </p>

      {/* Edit button */}
      <button
        onClick={() => onEdit(job)}
        style={{ background: 'none', border: 'none', color: c.jbtn, fontSize: '14px', cursor: 'pointer', flexShrink: 0 }}
      >
        ✎
      </button>

      {/* Delete button */}
      <button
        onClick={() => onDelete(job.$id)}
        style={{ background: 'none', border: 'none', color: c.jbtn, fontSize: '14px', cursor: 'pointer', flexShrink: 0 }}
      >
        ✕
      </button>

    </div>
  )
}

export default JobCard