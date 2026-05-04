import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'
import { signup as signupApi } from '../services/api'
import toast from 'react-hot-toast'
import { HiOutlineUser, HiOutlineMail, HiOutlineLockClosed, HiOutlineCheckCircle } from 'react-icons/hi'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const { loginUser } = useAuth()
  const navigate = useNavigate()

  const getErrorMessage = (err) => {
    const data = err.response?.data
    if (data?.error) return data.error
    if (Array.isArray(data?.errors) && data.errors.length > 0) return data.errors[0]
    if (typeof data === 'string' && data.trim()) return data
    return 'Signup failed'
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password.length < 6) { toast.error('Password must be at least 6 characters'); return }
    setLoading(true)
    try {
      const res = await signupApi({ name, email, password })
      const { token, id, role } = res.data
      loginUser({ id, name, email, role }, token)
      toast.success('Account created successfully!')
      navigate('/')
    } catch (err) {
      toast.error(getErrorMessage(err))
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
          <p className="auth-tagline">Join your team and start managing tasks today.</p>
          <div className="auth-features">
            <div className="auth-feature"><span className="feature-dot"></span><span>Create & assign tasks</span></div>
            <div className="auth-feature"><span className="feature-dot"></span><span>Track project progress</span></div>
            <div className="auth-feature"><span className="feature-dot"></span><span>Real-time dashboard</span></div>
          </div>
        </div>
        <div className="auth-right">
          <div className="auth-form-wrapper">
            <h2>Create account</h2>
            <p className="auth-subtitle">Start your free account</p>
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="input-group">
                <HiOutlineUser className="input-icon" />
                <input type="text" placeholder="Full name" value={name}
                  onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="input-group">
                <HiOutlineMail className="input-icon" />
                <input type="email" placeholder="Email address" value={email}
                  onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="input-group">
                <HiOutlineLockClosed className="input-icon" />
                <input type="password" placeholder="Password (min 6 chars)" value={password}
                  onChange={(e) => setPassword(e.target.value)} required minLength={6} />
              </div>
              <button type="submit" className="auth-btn" disabled={loading}>
                {loading ? 'Creating...' : 'Create Account'}
              </button>
            </form>
            <p className="auth-switch">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
