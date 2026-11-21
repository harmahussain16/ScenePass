
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { releaseTickets, reserveTickets } from '../utils/inventory'
import './MyBookings.css'

function MyBookings() {
  const [bookings, setBookings] = useState(() => {
    try {
      const user = JSON.parse(
        localStorage.getItem('scenePassUser')
      )

      if (!user || !user.email) {
        return []
      }

      const allBookings = JSON.parse(
        localStorage.getItem('scenePassBookings') || '[]'
      )

      return allBookings
        .filter(
          booking =>
            booking.userEmail === user.email.toLowerCase().trim()
        )
        .reverse()

    } catch {
      return []
    }
  })

  const isSignedIn = Boolean(
    localStorage.getItem('scenePassUser')
  )

  function handleCancel(bookingReference) {
    const confirmCancel = window.confirm(
      'Are you sure you want to cancel this booking? This action cannot be undone.'
    )

    if (!confirmCancel) {
      return
    }

    let ticketsReleased = false
    let selectedBooking = null

    try {
      const user = JSON.parse(
        localStorage.getItem('scenePassUser')
      )

      if (!user || !user.email) {
        return
      }

      const userEmail = user.email.toLowerCase().trim()

      const allBookings = JSON.parse(
        localStorage.getItem('scenePassBookings') || '[]'
      )

      // Find the selected user's booking
      selectedBooking = allBookings.find(booking =>
        booking.bookingReference === bookingReference &&
        booking.userEmail === userEmail
      )

      if (!selectedBooking) {
        alert('Booking not found. Please refresh the page.')
        return
      }

      // Return cancelled tickets to inventory
      const released = releaseTickets(
        selectedBooking.event.id,
        Number(selectedBooking.quantity)
      )

      if (!released) {
        throw new Error('Could not restore tickets to inventory.')
      }

      ticketsReleased = true

      // Remove only the selected user's booking
      const updatedBookings = allBookings.filter(booking => {
        return !(
          booking.bookingReference === bookingReference &&
          booking.userEmail === userEmail
        )
      })

      // Save the updated bookings
      localStorage.setItem(
        'scenePassBookings',
        JSON.stringify(updatedBookings)
      )

      // Update the page immediately
      setBookings(
        updatedBookings
          .filter(booking => booking.userEmail === userEmail)
          .reverse()
      )

    } catch (error) {
      // Undo the inventory restoration if saving the cancellation fails
      if (ticketsReleased && selectedBooking) {
        reserveTickets(
          selectedBooking.event.id,
          Number(selectedBooking.quantity)
        )
      }

      console.error('Could not cancel booking:', error)
      alert('Unable to cancel your booking. Please try again.')
    }
  }

  return (
    <main className="my-bookings-page">

      <div className="my-bookings-header">
        <p className="my-bookings-tag">YOUR SCENEPASS ACCOUNT</p>
        <h1>My Bookings</h1>
        <p>All your booked experiences, together in one place.</p>
      </div>

      {!isSignedIn ? (

        <div className="empty-bookings">
          <div className="empty-bookings-icon">🔐</div>
          <h2>Sign In Required</h2>
          <p>
            Please sign in to view your personal bookings.
          </p>
          <Link to="/signin" className="my-bookings-btn">
            Sign In
          </Link>
        </div>

      ) : bookings.length === 0 ? (

        <div className="empty-bookings">
          <div className="empty-bookings-icon">🎟️</div>
          <h2>No Bookings Yet</h2>
          <p>
            You haven't booked any events yet.
            Discover something exciting and make your next memory!
          </p>
          <Link to="/events" className="my-bookings-btn">
            Explore Events
          </Link>
        </div>

      ) : (

        <div className="my-bookings-list">

          <div className="bookings-count">
            You have {bookings.length} saved booking(s)
          </div>

          {bookings.map((booking, index) => (

            <article
              className="my-booking-card"
              key={booking.bookingReference || index}
            >

              <div className="my-booking-top">
                <div>
                  <span className="my-booking-category">
                    {booking.event.category}
                  </span>

                  <h2>{booking.event.title}</h2>

                  <p className="my-booking-location">
                    {booking.event.city} · {booking.event.venue}
                  </p>
                </div>

                <span className="booking-status">
                  Confirmed
                </span>
              </div>

              <div className="my-booking-info">

                <div>
                  <span>Booking Reference</span>
                  <strong>{booking.bookingReference}</strong>
                </div>

                <div>
                  <span>Tickets</span>
                  <strong>{booking.quantity}</strong>
                </div>

                <div>
                  <span>Total Amount</span>
                  <strong>
                    Rs. {Number(booking.totalPrice).toLocaleString('en-PK')}
                  </strong>
                </div>

                <div>
                  <span>Booked By</span>
                  <strong>{booking.customerName}</strong>
                </div>

              </div>

              <div className="my-booking-actions">

                <Link
                  to={`/events/${booking.event.id}`}
                  className="view-booking-event"
                >
                  View Event →
                </Link>

                <button
                  className="cancel-booking-btn"
                  onClick={() => handleCancel(booking.bookingReference)}
                >
                  Cancel Booking
                </button>

              </div>

            </article>

          ))}

        </div>

      )}

      <div className="my-bookings-footer">
        <Link to="/events" className="my-bookings-btn">
          Discover More Events
        </Link>
      </div>

    </main>
  )
}

export default MyBookings
