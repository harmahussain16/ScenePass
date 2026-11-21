
import { useLocation, useSearchParams, Link } from 'react-router-dom'
import './Confirmation.css'

function Confirmation() {
  const location = useLocation()
  const [searchParams] = useSearchParams()

  const reference = searchParams.get('ref')

  let booking = location.state

  // If the page is refreshed, retrieve the booking from localStorage
  if (!booking && reference) {
    try {
      const savedBookings = JSON.parse(
        localStorage.getItem('scenePassBookings') || '[]'
      )

      booking = savedBookings.find(
        item => item.bookingReference === reference
      )
    } catch {
      booking = null
    }
  }

  // If no booking is found, show an error message
  if (!booking || !booking.event) {
    return (
      <div className="confirmation-error">
        <h2>No Booking Information Found</h2>
        <p>Please select an event and complete the booking process.</p>
        <Link to="/events">Explore Events</Link>
      </div>
    )
  }

  const {
    event,
    quantity,
    totalPrice,
    customerName,
    email,
    phone,
    bookingReference
  } = booking

  return (
    <main className="confirmation-page">
      <section className="confirmation-card">

        <div className="success-icon">
          ✓
        </div>

        <p className="confirmation-tag">
          BOOKING CONFIRMATION
        </p>

        <h1>You're All Set!</h1>

        <p className="confirmation-message">
          Thank you, {customerName}! Your demo booking
          has been successfully completed.
        </p>

        <div className="reference-box">
          <p>BOOKING REFERENCE</p>
          <h2>{bookingReference}</h2>
        </div>

        <div className="confirmation-details">

          <h2>Booking Details</h2>

          <div className="confirmation-event">
            <span>{event.category}</span>
            <h3>{event.title}</h3>
            <p>{event.city} · {event.venue}</p>
          </div>

          <div className="confirmation-row">
            <span>Customer Name</span>
            <strong>{customerName}</strong>
          </div>

          <div className="confirmation-row">
            <span>Email Address</span>
            <strong>{email}</strong>
          </div>

          <div className="confirmation-row">
            <span>Phone Number</span>
            <strong>{phone}</strong>
          </div>

          <div className="confirmation-row">
            <span>Tickets</span>
            <strong>{quantity}</strong>
          </div>

          <div className="confirmation-total">
            <span>Total Paid</span>
            <h3>Rs. {totalPrice.toLocaleString('en-PK')}</h3>
          </div>

        </div>

        <div className="demo-notice">
          This is a demonstration confirmation.
          No real payment was processed and no actual
          reservation has been made.
        </div>

        <Link to="/" className="home-button">
          Back to Home
        </Link>

        <Link to="/events" className="explore-link">
          Explore More Events
        </Link>

      </section>
    </main>
  )
}

export default Confirmation
