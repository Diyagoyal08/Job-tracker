import { Outlet, Link, useLocation } from 'react-router-dom'
import { useTheme } from '../../context/ThemeContext'
import useAuth from '../../hooks/useAuth'
import { getColors } from '../../styles/theme'

function Layout() {
  const { theme, toggleTheme } = useTheme()
  const { user, handleLogout } = useAuth()
  const location = useLocation()
  const isDark   = theme === 'dark'
  const c        = getColors(isDark)

  const navItems = [
    { label: 'Dashboard',  path: '/',           icon: <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="1" width="6" height="6" rx="1.5"/><rect x="9" y="1" width="6" height="6" rx="1.5"/><rect x="1" y="9" width="6" height="6" rx="1.5"/><rect x="9" y="9" width="6" height="6" rx="1.5"/></svg> },
    { label: 'All Jobs',   path: '/all-jobs',   icon: <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="12" height="11" rx="1.5"/><path d="M5 3V2M11 3V2M2 7h12"/></svg> },
    { label: 'Interviews', path: '/interviews', icon: <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="8" cy="8" r="6"/><path d="M8 5v3l2 2"/></svg> },
    { label: 'Saved',      path: '/saved',      icon: <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 2h10a1 1 0 011 1v11l-5-3-5 3V3a1 1 0 011-1z"/></svg> },
  ]

  const pageTitle = navItems.find(n => n.path === location.pathname)?.label || 'Profile'

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <div style={{ display: 'flex', height: '100vh', background: c.bg, fontFamily: "-apple-system, 'Inter', 'Segoe UI', sans-serif" }}>

      {/* ── Sidebar ── */}
      <aside style={{ width: '196px', flexShrink: 0, background: c.sbBg, borderRight: `1px solid ${c.border}`, display: 'flex', flexDirection: 'column' }}>

        {/* Logo */}
        <div style={{ padding: '18px 16px 14px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: `1px solid ${c.border}` }}>
          <div style={{ width: '28px', height: '28px', borderRadius: '7px', background: c.sbLogomark, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.primaryText, fontSize: '11px', fontWeight: 700, flexShrink: 0 }}>JT</div>
          <span style={{ fontSize: '13px', fontWeight: 650, letterSpacing: '-0.3px', color: c.sbBrand }}>JobTrack</span>
        </div>

        {/* Nav */}
        <nav style={{ padding: '8px 4px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <span style={{ padding: '10px 10px 4px', fontSize: '9px', fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', color: c.sbSection }}>Main</span>

          {navItems.map(({ label, path, icon }) => {
            const active = location.pathname === path
            return (
              <Link key={path} to={path} style={{
                textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: '9px',
                padding: '7px 10px', margin: '1px 4px', borderRadius: '7px',
                fontSize: '12px', fontWeight: active ? 550 : 450,
                background: active ? c.navActive : 'transparent',
                color: active ? c.navActiveText : c.navText,
                transition: 'background .12s, color .12s',
              }}>
                <span style={{ opacity: active ? 1 : 0.6, display: 'flex', alignItems: 'center' }}>{icon}</span>
                {label}
              </Link>
            )
          })}
        </nav>

        {/* User footer */}
        <div style={{ borderTop: `1px solid ${c.sbFooter}`, padding: '10px' }}>
          <Link to="/profile" style={{
            textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: '8px',
            padding: '7px 8px', borderRadius: '7px',
            background: location.pathname === '/profile' ? c.navActive : 'transparent',
            transition: 'background .12s',
          }}>
            <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: c.avBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: 700, color: c.avText, flexShrink: 0 }}>
              {user?.name?.[0]?.toUpperCase()}
            </div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: '11px', fontWeight: 500, color: location.pathname === '/profile' ? c.navActiveText : c.text, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name?.split(' ')[0]}</div>
              <div style={{ fontSize: '9px', color: location.pathname === '/profile' ? c.navActiveText : c.textMuted, opacity: 0.8, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.email}</div>
            </div>
          </Link>
        </div>
      </aside>

      {/* ── Main ── */}
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>

        {/* Topbar */}
        <header style={{ height: '52px', padding: '0 20px', background: c.topbar, borderBottom: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 10, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '-0.2px', color: c.text }}>{pageTitle}</h1>
            <span style={{ fontSize: '11px', color: c.textMuted }}>· {today}</span>
          </div>
          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <button
              onClick={toggleTheme}
              style={{ padding: '5px 10px', borderRadius: '7px', fontSize: '11px', cursor: 'pointer', fontWeight: 500, border: `1px solid ${c.btnSmBorder}`, background: c.btnSmBg, color: c.btnSmText }}
            >
              {isDark ? '☀️' : '🌙'}
            </button>
            <button
              onClick={handleLogout}
              style={{ padding: '5px 12px', borderRadius: '7px', fontSize: '11px', cursor: 'pointer', fontWeight: 500, border: `1px solid ${c.btnSmBorder}`, background: c.btnSmBg, color: c.btnSmText }}
            >
              Sign out
            </button>
          </div>
        </header>

        {/* Page content */}
        <Outlet />
      </div>
    </div>
  )
}

export default Layout