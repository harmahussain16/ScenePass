
import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'

import events from '../data/events'
import { getAvailableSeats } from '../utils/inventory'
import './EventDetails.css'

function EventDetails() {
  const { id } = useParams()
  const navigate = useNavigate()

  const event = events.find(
    (item) => item.id === Number(id)
  )

  const [quantity, setQuantity] = useState(1)
  const [availableSeats, setAvailableSeats] = useState(0)

  useEffect(() => {
    if (event) {
      setAvailableSeats(getAvailableSeats(event.id))
    }
  }, [event])

  if (!event) {
    return (
      <div className="details-error">
        <h2>Event Not Found</h2>
        <p>Sorry, this event does not exist.</p>
        <Link to="/events">Explore Other Events</Link>
      </div>
    )
  }

  const totalPrice = event.price * quantity

  const eventDate = new Date(
    event.date + 'T00:00:00'
  ).toLocaleDateString('en-PK', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  function handleBooking() {
    // Refresh inventory before proceeding
    const currentSeats = getAvailableSeats(event.id)
    setAvailableSeats(currentSeats)

    if (quantity > currentSeats || currentSeats <= 0) {
      alert('Sorry, there are not enough tickets available.')
      setQuantity(1)
      return
    }

    navigate('/booking', {
      state: {
        event: event,
        quantity: quantity
      }
    })
  }

  return (
    <main className="event-details-page">

      <Link to="/events" className="back-link">
        ← Back to Events
      </Link>

      <div className="details-container">

        <section className="details-main">

          <span className="details-category">
            {event.category}
          </span>

          <h1>{event.title}</h1>

          <p className="details-description">
            {event.description}
          </p>

          <div className="details-info-grid">

            <div className="details-info-item">
              <p>EVENT DATE</p>
              <h3>{eventDate}</h3>
            </div>

            <div className="details-info-item">
              <p>CITY</p>
              <h3>{event.city}</h3>
            </div>

            <div className="details-info-item">
              <p>VENUE</p>
              <h3>{event.venue}</h3>
            </div>

            <div className="details-info-item">
              <p>EVENT CATEGORY</p>
              <h3>{event.category}</h3>
            </div>

          </div>

        </section>

        <aside className="booking-panel">

          <h2>Book Your Tickets</h2>

          <p>Secure your spot at this event.</p>

          <span className="ticket-price-label">
            Ticket price
          </span>

          <h3 className="ticket-price">
            Rs. {event.price.toLocaleString('en-PK')}
          </h3>

          <div className="seat-status">
            {availableSeats > 0
              ? `${availableSeats} seats available`
              : 'Sold out'}
          </div>

          <label className="quantity-label">
            Number of Tickets
          </label>

          <div className="quantity-control">

            <button
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              aria-label="Decrease tickets"
            >
              −
            </button>

            <span>{quantity}</span>

            <button
              onClick={() => setQuantity(q => q + 1)}
              disabled={quantity >= Math.min(10, availableSeats)}
              aria-label="Increase tickets"
            >
              +
            </button>

          </div>

          <div className="total-price">
            <p>Total Amount</p>
            <h3>Rs. {totalPrice.toLocaleString('en-PK')}</h3>
          </div>

          <button
            className="book-now-btn"
            onClick={handleBooking}
            disabled={availableSeats <= 0 || quantity > availableSeats}
          >
            {availableSeats > 0
              ? 'Continue to Booking'
              : 'Sold Out'}
          </button>

        </aside>

      </div>

    </main>
  )
}

export default EventDetails
