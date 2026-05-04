import { useAuth } from '../context/useAuth'
import { useNavigate } from 'react-router-dom'
import { HiOutlineViewGrid, HiOutlineLogout } from 'react-icons/hi'

export default function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">✓</div>
          <span className="logo-text">TaskFlow</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <a href="/" className="nav-item active" onClick={(e) => { e.preventDefault(); navigate('/') }}>
          <HiOutlineViewGrid size={20} />
          <span>Dashboard</span>
        </a>
      </nav>

      <div className="sidebar-footer">
        <div className="user-card">
          <div className="user-avatar">{user?.name?.[0] || 'U'}</div>
          <div className="user-info">
            <span className="user-name">{user?.name}</span>
            <span className="user-role">{user?.role}</span>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          <HiOutlineLogout size={18} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  )
}
