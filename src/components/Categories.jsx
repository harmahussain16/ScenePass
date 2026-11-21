
import { Link } from 'react-router-dom'
import './Categories.css'

function Categories() {

  const categories = [
    {
      id: 1,
      icon: '🎤',
      name: 'Concerts',
      description: 'Live music and performances'
    },
    {
      id: 2,
      icon: '🎡',
      name: 'Festivals',
      description: 'Celebrate unforgettable moments'
    },
    {
      id: 3,
      icon: '🎨',
      name: 'Workshops',
      description: 'Learn something new'
    },
    {
      id: 4,
      icon: '🖼️',
      name: 'Exhibitions',
      description: 'Art, culture and creativity'
    },
    {
      id: 5,
      icon: '🎭',
      name: 'Comedy Shows',
      description: 'Laugh your heart out'
    },
    {
      id: 6,
      icon: '🎓',
      name: 'University Events',
      description: 'Experiences made for students'
    }
  ]

  return (
    <section id="categories" className="categories-section">

      <div className="categories-heading">
        <div>
          <p className="section-tag">FIND YOUR EXPERIENCE</p>
          <h2>Explore by Category</h2>
          <p className="section-description">
            Whatever you're in the mood for,
            there's something waiting for you.
          </p>
        </div>

        <span className="category-count">
          06 CATEGORIES
        </span>
      </div>

      <div className="categories-grid">

        {categories.map((category) => (
          <Link
            to={`/events?category=${encodeURIComponent(category.name)}`}
            className="category-card"
            key={category.id}
          >

            <div className="category-icon">
              {category.icon}
            </div>

            <h3>{category.name}</h3>

            <p>{category.description}</p>

            <span className="category-arrow">↗</span>

          </Link>
        ))}

      </div>

    </section>
  )
}

export default Categories
