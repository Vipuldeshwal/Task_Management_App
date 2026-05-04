import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { login as loginApi } from '../services/api'
import toast from 'react-hot-toast'
import { HiOutlineMail, HiOutlineLockClosed, HiOutlineCheckCircle } from 'react-icons/hi'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { loginUser } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await loginApi({ email, password })
      const { token, id, name, role } = res.data
      loginUser({ id, name, email, role }, token)
      toast.success(`Welcome back, ${name}!`)
      navigate('/')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-left">
          <div className="auth-brand">
            <div className="auth-logo">
              <HiOutlineCheckCircle size={32} />
            </div>
            <h1>TaskFlow</h1>
          </div>
          <p className="auth-tagline">Manage your team's tasks with clarity and speed.</p>
          <div className="auth-features">
            <div className="auth-feature">
              <span className="feature-dot"></span>
              <span>Kanban task boards</span>
            </div>
            <div className="auth-feature">
              <span className="feature-dot"></span>
              <span>Team collaboration</span>
            </div>
            <div className="auth-feature">
              <span className="feature-dot"></span>
              <span>Role-based access</span>
            </div>
          </div>
        </div>
        <div className="auth-right">
          <div className="auth-form-wrapper">
            <h2>Welcome back</h2>
            <p className="auth-subtitle">Sign in to your account</p>
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="input-group">
                <HiOutlineMail className="input-icon" />
                <input type="email" placeholder="Email address" value={email}
                  onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="input-group">
                <HiOutlineLockClosed className="input-icon" />
                <input type="password" placeholder="Password" value={password}
                  onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
            <p className="auth-switch">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  )
}
