
import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import './SignIn.css'

function SignIn() {
  const navigate = useNavigate()
  const location = useLocation()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    if (!name.trim() || !email.trim()) {
      setError('Please fill in both fields.')
      return
    }

    const user = {
      name: name.trim(),
      email: email.trim()
    }

    localStorage.setItem('scenePassUser', JSON.stringify(user))
    window.dispatchEvent(new Event('scenePassAuthChanged'))
    
    navigate(location.state?.from || '/', {
    state: location.state?.bookingData
    })
  }

  return (
    <main className="signin-page">

      <section className="signin-card">

        <Link to="/" className="signin-logo">
          ScenePass
        </Link>

        <p className="signin-tag">WELCOME TO SCENEPASS</p>

        <h1>Welcome Back!</h1>

        <p className="signin-description">
          Sign in to explore events and manage your bookings.
        </p>

        <form onSubmit={handleSubmit}>

          <div className="signin-field">
            <label htmlFor="name">Your Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="signin-field">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {error && (
            <p className="signin-error">{error}</p>
          )}

          <button type="submit" className="signin-submit">
            Sign In
          </button>

        </form>

        <p className="signin-footer">
          New to ScenePass? Discover your next experience!
        </p>

      </section>

    </main>
  )
}

export default SignIn
