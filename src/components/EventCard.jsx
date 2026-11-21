
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getAvailableSeats } from '../utils/inventory'
import './EventCard.css'

function EventCard({ event }) {

  const categoryIcons = {
    Concerts: '🎤',
    Festivals: '🎡',
    Workshops: '🎨',
    Exhibitions: '🖼️',
    'Comedy Shows': '🎭',
    'University Events': '🎓'
  }

  const [availableSeats, setAvailableSeats] = useState(
    () => getAvailableSeats(event.id)
  )

  // Refresh available seats when the event card loads
  useEffect(() => {
    const updateSeats = () => {
      setAvailableSeats(getAvailableSeats(event.id))
    }

    updateSeats()

    // Listen for inventory changes from other browser tabs
    window.addEventListener('storage', updateSeats)

    return () => {
      window.removeEventListener('storage', updateSeats)
    }
  }, [event.id])

  return (
    <div className="listing-card">

      <div className="listing-visual">

        {event.image && (
          <img
            src={event.image}
            alt={event.title}
            className="listing-image"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        )}

        <span className="listing-category">
          {event.category}
        </span>

        {!event.image && (
          <span className="listing-symbol">
            {categoryIcons[event.category]}
          </span>
        )}

      </div>

      <div className="listing-info">

        <p className="listing-date">
          {new Date(event.date + 'T00:00:00').toLocaleDateString(
            'en-PK',
            {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            }
          )}
        </p>

        <h3>{event.title}</h3>

        <p className="listing-location">
          {event.city} · {event.venue}
        </p>

        <div className="listing-bottom">

          <div>
            <p>Starting from</p>
            <h4>Rs. {event.price.toLocaleString('en-PK')}</h4>
          </div>

          <Link
            to={`/events/${event.id}`}
            className="listing-btn"
          >
            View Event ↗
          </Link>

        </div>

        <p className="listing-seats">
          {availableSeats > 0
            ? `${availableSeats} seats available`
            : 'Sold out'}
        </p>

      </div>

    </div>
  )
}

export default EventCard
