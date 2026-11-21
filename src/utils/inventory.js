
import events from '../data/events'
import { validateTicketQuantity } from './bookingRules.mjs'

const INVENTORY_KEY = 'scenePassInventory'
const BOOKINGS_KEY = 'scenePassBookings'

const MAX_TICKETS_PER_BOOKING = 10

// Initialize inventory using the original event seat counts
function initializeInventory() {
  const savedInventory = localStorage.getItem(INVENTORY_KEY)

  if (savedInventory) {
    try {
      return JSON.parse(savedInventory)
    } catch {
      localStorage.removeItem(INVENTORY_KEY)
    }
  }

  // Account for bookings that already exist
  let bookings = []

  try {
    bookings = JSON.parse(
      localStorage.getItem(BOOKINGS_KEY) || '[]'
    )
  } catch {
    bookings = []
  }

  const inventory = {}

  events.forEach(event => {
    const bookedTickets = bookings
      .filter(booking => booking.event.id === event.id)
      .reduce(
        (total, booking) => total + Number(booking.quantity),
        0
      )

    inventory[event.id] = Math.max(
      0,
      event.availableSeats - bookedTickets
    )
  })

  localStorage.setItem(
    INVENTORY_KEY,
    JSON.stringify(inventory)
  )

  return inventory
}

// Get the current inventory
export function getInventory() {
  return initializeInventory()
}

// Get available seats for one event
export function getAvailableSeats(eventId) {
  const inventory = getInventory()
  return inventory[eventId] ?? 0
}

// Reserve tickets when a booking is confirmed

export function reserveTickets(eventId, quantity) {
  const inventory = getInventory()
  const available = inventory[eventId]

  if (available === undefined) {
    return {
      success: false,
      message: 'Event inventory not found.'
    }
  }

  const validation = validateTicketQuantity(quantity, available)

  if (!validation.success) {
    return validation
  }

  inventory[eventId] = available - quantity

  localStorage.setItem(
    INVENTORY_KEY,
    JSON.stringify(inventory)
  )

  return { success: true }
}


// Restore tickets when a booking is cancelled
export function releaseTickets(eventId, quantity) {
  const inventory = getInventory()
  const event = events.find(item => item.id === eventId)

  if (!event || !Number.isInteger(quantity) || quantity <= 0) {
    return false
  }

  inventory[eventId] = Math.min(
    event.availableSeats,
    (inventory[eventId] ?? 0) + quantity
  )

  localStorage.setItem(
    INVENTORY_KEY,
    JSON.stringify(inventory)
  )

  return true
}
