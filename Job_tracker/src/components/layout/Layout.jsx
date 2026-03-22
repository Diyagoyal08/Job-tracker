import { Outlet, Link, useLocation } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import useAuth from '../../hooks/useAuth'

function Layout() {
  const { theme, toggleTheme } = useTheme()
  const { user, handleLogout } = useAuth()
  const location = useLocation()
  const isDark = theme === 'dark'

  const c = {
    dash:    isDark ? '#000000' : '#f5f4ee',
    sb:      isDark ? '#0a0a0a' : '#eeeee6',
    border:  isDark ? '#1a1a1a' : '#ddd8b8',
    topbar:  isDark ? '#0a0a0a' : '#eeeee6',
    nav1bg:  isDark ? '#1a1a2e' : '#ddd8b8',
    nav1c:   isDark ? '#ddd8b8' : '#542E71',
    navC:    isDark ? '#6A66A3' : '#84A9C0',
    logoC:   isDark ? '#ddd8b8' : '#542E71',
    title:   isDark ? '#ddd8b8' : '#542E71',
    sub:     isDark ? '#6A66A3' : '#84A9C0',
    btnBg:   isDark ? '#111111' : '#eeeee6',
    btnBorder: isDark ? '#222222' : '#ddd8b8',
    btnC:    isDark ? '#84A9C0' : '#6A66A3',
  }

  const navItems = [
    { icon: '◈', label: 'Dashboard',  path: '/'           },
    { icon: '◉', label: 'All Jobs',   path: '/all-jobs'   },
    { icon: '◎', label: 'Saved',      path: '/saved'      },
    { icon: '◷', label: 'Interviews', path: '/interviews' },
  ]

  return (
    <div style={{ display: 'flex', height: '100vh', background: c.dash, fontFamily: 'system-ui, sans-serif' }}>

      {/* Sidebar */}
      <div style={{ width: '200px', flexShrink: 0, background: c.sb, borderRight: `1px solid ${c.border}`, display: 'flex', flexDirection: 'column', padding: '20px 0' }}>
        <div style={{ padding: '0 16px 20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'linear-gradient(135deg,#6A66A3,#542E71)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700', fontSize: '12px' }}>JT</div>
          <span style={{ fontSize: '14px', fontWeight: '700', color: c.logoC }}>JobTrack</span>
        </div>

        {/* Nav items — each is a Link so clicking navigates */}
        {navItems.map(({ icon, label, path }) => {
          const active = location.pathname === path
          return (
            <Link
              key={path}
              to={path}
              style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 16px', margin: '1px 8px', borderRadius: '10px', background: active ? c.nav1bg : 'none', color: active ? c.nav1c : c.navC, fontSize: '12px', fontWeight: active ? '600' : '400' }}
            >
              <span>{icon}</span>{label}
            </Link>
          )
        })}

        {/* Profile link at bottom */}
        <div style={{ marginTop: 'auto', padding: '0 8px' }}>
          <Link
            to="/profile"
            style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px', padding: '9px 16px', borderRadius: '10px', background: location.pathname === '/profile' ? c.nav1bg : 'none', color: location.pathname === '/profile' ? c.nav1c : c.navC, fontSize: '12px', fontWeight: location.pathname === '/profile' ? '600' : '400' }}
          >
            <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'linear-gradient(135deg,#6A66A3,#542E71)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '10px', fontWeight: '700' }}>
              {user?.name?.[0]?.toUpperCase()}
            </div>
            {user?.name?.split(' ')[0]}
          </Link>
        </div>
      </div>

      {/* Main area — sticky navbar + Outlet */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>

        {/* Sticky navbar */}
        <div style={{ background: c.topbar, borderBottom: `1px solid ${c.border}`, padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
          <div>
            <h1 style={{ fontSize: '16px', fontWeight: '700', color: c.title }}>
              {navItems.find(n => n.path === location.pathname)?.label || 'Profile'}
            </h1>
            <p style={{ fontSize: '11px', color: c.sub, marginTop: '1px' }}>Welcome back, {user?.name} ✨</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
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

        {/* Page content renders here */}
        <Outlet />
      </div>

    </div>
  )
}

export default Layout