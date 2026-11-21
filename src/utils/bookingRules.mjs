
export const MAX_TICKETS_PER_BOOKING = 10

// Validate ticket quantity before allowing a booking
export function validateTicketQuantity(quantity, available) {
  if (!Number.isInteger(quantity) || quantity <= 0) {
    return {
      success: false,
      message: 'Please select a valid ticket quantity.'
    }
  }

  if (quantity > MAX_TICKETS_PER_BOOKING) {
    return {
      success: false,
      message: `You can book a maximum of ${MAX_TICKETS_PER_BOOKING} tickets per booking.`
    }
  }

  if (quantity > available) {
    return {
      success: false,
      message: `Only ${available} tickets are available.`
    }
  }

  return { success: true }
}
