
import { Link } from 'react-router-dom'
import './Hero.css'

function Hero() {
  const scrollToCategories = () => {
    document.getElementById('categories')?.scrollIntoView({
      behavior: 'smooth'
    })
  }

  return (
    <section className="hero-section">

      <div className="hero-content">

        <p className="hero-tag">
          DISCOVER EXPERIENCES. CREATE MEMORIES.
        </p>

        <h1>
          Your Next
          <br />
          Great Experience
          <br />
          <span>Starts Here.</span>
        </h1>

        <p className="hero-description">
          Discover exciting concerts, festivals, workshops
          and unforgettable events happening across Pakistan.
        </p>

        <div className="hero-buttons">

          <Link to="/events" className="explore-btn">
            Explore Events
          </Link>

          <button
            className="learn-btn"
            onClick={scrollToCategories}
          >
            Learn More
          </button>

        </div>

      </div>

      <div className="hero-side">
        <div className="hero-card">
          <p>YOUR CITY, YOUR MOMENTS</p>
          <h2>Find something unforgettable.</h2>
          <span>ISLAMABAD · LAHORE · KARACHI</span>
        </div>
      </div>

    </section>
  )
}

export default Hero
