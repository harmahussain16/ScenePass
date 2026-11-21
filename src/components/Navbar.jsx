
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const navigate = useNavigate()

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('scenePassUser')) || null
    } catch {
      return null
    }
  })

  useEffect(() => {
    function updateUser() {
      try {
        setUser(
          JSON.parse(localStorage.getItem('scenePassUser')) || null
        )
      } catch {
        setUser(null)
      }
    }

    window.addEventListener('scenePassAuthChanged', updateUser)
    window.addEventListener('storage', updateUser)

    return () => {
      window.removeEventListener('scenePassAuthChanged', updateUser)
      window.removeEventListener('storage', updateUser)
    }
  }, [])

  function handleSignOut() {
    localStorage.removeItem('scenePassUser')
    setUser(null)
    window.dispatchEvent(new Event('scenePassAuthChanged'))
    navigate('/')
  }

  return (
    <nav>
      <Link to="/" className="logo">
        <span className="logo-icon">
            <svg
            viewBox="0 0 24 24"
            width="25"
            height="25"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            >
            <path d="M3 8a2 2 0 0 0 0 4v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0 0-4V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z" />
            <path d="M13 4v2M13 10v2M13 16v2" />
            </svg>
        </span>

        <span>ScenePass</span>
      </Link>

      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/events">Explore Events</Link>
        </li>

        <li>
          <Link to="/my-bookings">My Bookings</Link>
        </li>
      </ul>

      {user ? (
        <div className="navbar-user">
          <span className="welcome-user">
            Welcome, {user.name}
          </span>

          <button
            onClick={handleSignOut}
            className="signout-nav-btn"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <Link to="/signin" className="signin-nav-btn">
          Sign In
        </Link>
      )}
    </nav>
  )
}

export default Navbar
