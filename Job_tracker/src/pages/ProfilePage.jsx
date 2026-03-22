import { useTheme } from '../context/ThemeContext'
import useAuth from '../hooks/useAuth'

function ProfilePage() {
  const { theme } = useTheme()
  const { user, handleLogout } = useAuth()
  const isDark = theme === 'dark'

  const c = {
    bg:     isDark ? '#000000' : '#f5f4ee',
    card:   isDark ? '#0a0a0a' : '#ffffff',
    border: isDark ? '#1a1a1a' : '#ddd8b8',
    title:  isDark ? '#ddd8b8' : '#542E71',
    sub:    isDark ? '#6A66A3' : '#84A9C0',
    text:   isDark ? '#f0ede0' : '#333333',
  }

  return (
    <div style={{ padding: '24px', background: c.bg, minHeight: '100%' }}>
      <div style={{ maxWidth: '480px', margin: '0 auto' }}>

        {/* Avatar + name */}
        <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: '20px', padding: '28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg,#6A66A3,#542E71)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700', fontSize: '28px' }}>
            {user?.name?.[0]?.toUpperCase()}
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '18px', fontWeight: '700', color: c.title }}>{user?.name}</p>
            <p style={{ fontSize: '13px', color: c.sub, marginTop: '4px' }}>{user?.email}</p>
          </div>
        </div>

        {/* Details card */}
        <div style={{ background: c.card, border: `1px solid ${c.border}`, borderRadius: '16px', overflow: 'hidden', marginBottom: '16px' }}>
          {[
            { label: 'Name',  value: user?.name },
            { label: 'Email', value: user?.email },
            { label: 'Joined', value: user?.$createdAt ? new Date(user.$createdAt).toLocaleDateString() : '—' },
          ].map(({ label, value }, i, arr) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', borderBottom: i < arr.length - 1 ? `1px solid ${c.border}` : 'none' }}>
              <span style={{ fontSize: '12px', color: c.sub, fontWeight: '500' }}>{label}</span>
              <span style={{ fontSize: '13px', color: c.text }}>{value}</span>
            </div>
          ))}
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          style={{ width: '100%', padding: '12px', borderRadius: '14px', border: '1px solid #542E71', background: 'none', color: '#542E71', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
        >
          Log out
        </button>

      </div>
    </div>
  )
}

export default ProfilePage