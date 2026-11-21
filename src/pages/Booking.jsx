
import { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { reserveTickets, releaseTickets } from '../utils/inventory'
import './Booking.css'

function Booking() {
  const [signinAlert, setSigninAlert] = useState(false)

  const [customerName, setCustomerName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  const [errors, setErrors] = useState({})

  const location = useLocation()
  const navigate = useNavigate()

  const bookingData = location.state

  if (!bookingData || !bookingData.event) {
    return (
      <div className="booking-error">
        <h2>No Booking Selected</h2>
        <p>Please select an event before proceeding.</p>
        <Link to="/events">Explore Events</Link>
      </div>
    )
  }

  const { event, quantity } = bookingData

  const totalPrice = event.price * quantity

  // Validate customer information
  function validateForm() {
    const newErrors = {}

    const trimmedName = customerName.trim()
    const trimmedEmail = email.trim()
    const digitsOnly = phone.replace(/\D/g, '')

    // Name validation
    if (!trimmedName) {
      newErrors.customerName = 'Please enter your full name.'
    } else if (trimmedName.length < 2) {
      newErrors.customerName = 'Name must contain at least 2 characters.'
    } else if (trimmedName.length > 50) {
      newErrors.customerName = 'Name cannot exceed 50 characters.'
    } else if (!/^[a-zA-Z\s'-]+$/.test(trimmedName)) {
      newErrors.customerName = 'Name can only contain letters, spaces, apostrophes and hyphens.'
    }

    // Email validation
    if (!trimmedEmail) {
      newErrors.email = 'Please enter your email address.'
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)
    ) {
      newErrors.email = 'Please enter a valid email address.'
    }

    // Phone validation
    if (!phone.trim()) {
      newErrors.phone = 'Please enter your phone number.'
    } else if (digitsOnly.length < 10 || digitsOnly.length > 15) {
      newErrors.phone = 'Phone number must contain 10 to 15 digits.'
    }

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e) {
    e.preventDefault()

    // Validate all customer fields
    if (!validateForm()) {
      setSigninAlert(false)
      return
    }

    // Check whether the user is signed in
    const savedUser = localStorage.getItem('scenePassUser')

    if (!savedUser) {
      setSigninAlert(true)
      return
    }

    setSigninAlert(false)

    let currentUser

    try {
      currentUser = JSON.parse(savedUser)

      if (!currentUser || !currentUser.email) {
        setSigninAlert(true)
        return
      }
    } catch {
      setSigninAlert(true)
      return
    }

    // Reserve tickets from shared inventory
    const inventoryResult = reserveTickets(event.id, quantity)

    if (!inventoryResult.success) {
      alert(inventoryResult.message)
      return
    }

    // Generate booking reference
    const bookingReference =
      `SP-${Date.now().toString().slice(-8)}`

    // Create booking object
    const newBooking = {
      bookingReference,
      event,
      quantity,
      totalPrice,
      customerName: customerName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      userEmail: currentUser.email.toLowerCase().trim(),
      bookingDate: new Date().toISOString()
    }

    try {
      // Get previously saved bookings
      const savedBookings = JSON.parse(
        localStorage.getItem('scenePassBookings') || '[]'
      )

      // Add new booking
      savedBookings.push(newBooking)

      // Save bookings
      localStorage.setItem(
        'scenePassBookings',
        JSON.stringify(savedBookings)
      )

      // Navigate to confirmation
      navigate(`/confirmation?ref=${bookingReference}`, {
        state: newBooking
      })

    } catch (error) {
      // Restore tickets if saving fails
      releaseTickets(event.id, quantity)

      console.error('Could not save booking:', error)
      alert('Unable to save your booking. Please try again.')
    }
  }

  return (
    <main className="booking-page">

      <div className="booking-header">
        <p className="section-tag">ALMOST THERE</p>
        <h1>Complete Your Booking</h1>
        <p>Just a few details before your experience begins.</p>
      </div>

      <div className="booking-layout">

        <section className="customer-form">

          <h2>Your Information</h2>

          <p className="form-description">
            Enter your details to reserve your tickets.
          </p>

          <form onSubmit={handleSubmit} noValidate>

            <div className="form-group">
              <label htmlFor="customer-name">Full Name</label>

              <input
                id="customer-name"
                type="text"
                placeholder="Enter your full name"
                value={customerName}
                maxLength={50}
                aria-invalid={Boolean(errors.customerName)}
                aria-describedby={errors.customerName ? 'name-error' : undefined}
                onChange={(e) => {
                  setCustomerName(e.target.value)
                  setErrors(prev => ({ ...prev, customerName: '' }))
                }}
              />

              {errors.customerName && (
                <p className="field-error" id="name-error" role="alert">
                  {errors.customerName}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="customer-email">Email Address</label>

              <input
                id="customer-email"
                type="email"
                placeholder="Enter your email"
                value={email}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setErrors(prev => ({ ...prev, email: '' }))
                }}
              />

              {errors.email && (
                <p className="field-error" id="email-error" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="customer-phone">Phone Number</label>

              <input
                id="customer-phone"
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                onChange={(e) => {
                  setPhone(e.target.value)
                  setErrors(prev => ({ ...prev, phone: '' }))
                }}
              />

              {errors.phone && (
                <p className="field-error" id="phone-error" role="alert">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Sign In Required Alert */}
            {signinAlert && (
              <div className="signin-required-alert">
                <strong>Sign In Required!</strong>

                <p>
                  Please sign in before confirming your booking.
                </p>

                <Link
                  to="/signin"
                  state={{
                    from: '/booking',
                    bookingData: bookingData
                  }}
                >
                  Sign In Now →
                </Link>
              </div>
            )}

            <button type="submit" className="confirm-booking-btn">
              Confirm Booking
            </button>

          </form>

        </section>

        <aside className="booking-summary">

          <h2>Booking Summary</h2>

          <div className="summary-event">
            <span>{event.category}</span>
            <h3>{event.title}</h3>
            <p>{event.city} · {event.venue}</p>
          </div>

          <div className="summary-row">
            <span>Ticket Price</span>
            <span>Rs. {event.price.toLocaleString('en-PK')}</span>
          </div>

          <div className="summary-row">
            <span>Number of Tickets</span>
            <span>{quantity}</span>
          </div>

          <div className="summary-row">
            <span>Booking Fee</span>
            <span>Rs. 0</span>
          </div>

          <div className="summary-total">
            <span>Total Amount</span>
            <h3>Rs. {totalPrice.toLocaleString('en-PK')}</h3>
          </div>

          <p className="summary-note">
            This is a demonstration booking. No real payment will be collected.
          </p>

        </aside>

      </div>

    </main>
  )
}

export default Booking
