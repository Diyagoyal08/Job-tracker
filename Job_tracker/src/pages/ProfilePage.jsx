 import { useTheme } from '../context/ThemeContext'
import useAuth from '../hooks/useAuth'
import { getColors } from '../styles/theme'

function ProfilePage() {
  const { theme }          = useTheme()
  const { user, handleLogout } = useAuth()
  const isDark             = theme === 'dark'
  const c                  = getColors(isDark)

  const fields = [
    { label: 'Full name', value: user?.name },
    { label: 'Email',     value: user?.email },
    { label: 'Member since', value: user?.$createdAt ? new Date(user.$createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : '—' },
  ]

  return (
    <div style={{ padding: '24px 20px', background: c.bg, minHeight: '100%' }}>
      <div style={{ maxWidth: '440px' }}>

        {/* Avatar card */}
        <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: '12px', padding: '28px 24px', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: c.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.primaryText, fontWeight: 700, fontSize: '22px', flexShrink: 0 }}>
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div>
            <p style={{ fontSize: '16px', fontWeight: 650, letterSpacing: '-0.3px', color: c.text }}>{user?.name}</p>
            <p style={{ fontSize: '12px', color: c.textSub, marginTop: '2px' }}>{user?.email}</p>
          </div>
        </div>

        {/* Details */}
        <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: '12px', overflow: 'hidden', marginBottom: '12px' }}>
          {fields.map(({ label, value }, i) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 18px', borderBottom: i < fields.length - 1 ? `1px solid ${c.border}` : 'none' }}>
              <span style={{ fontSize: '11px', fontWeight: 550, color: c.textSub }}>{label}</span>
              <span style={{ fontSize: '12px', color: c.text }}>{value}</span>
            </div>
          ))}
        </div>

        {/* Sign out */}
        <button
          onClick={handleLogout}
          style={{ width: '100%', padding: '11px', borderRadius: '10px', border: `1px solid ${c.border}`, background: 'none', color: c.textSub, fontSize: '12px', fontWeight: 550, cursor: 'pointer', transition: 'all .12s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = c.primary; e.currentTarget.style.color = c.text }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = c.border; e.currentTarget.style.color = c.textSub }}
        >
          Sign out
        </button>
      </div>
    </div>
  )
}

export default ProfilePage