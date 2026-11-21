# ScenePass – Event Discovery & Ticket Booking

## Student Details

- **Student Name:** Harma Hussain
- **Roll Number:** i242032
- **Section:** CY-B
- **Course:**  CS4032 – Web programming
- **Assignment:** Assignment 02
- **Business Name:** ScenePass

## Project Description

ScenePass is a React-based event discovery and ticket-booking website. It allows users to explore events, search and filter available events, view event details, select tickets, and manage their bookings.

The website provides a simple and user-friendly experience for discovering events and completing a simulated ticket-booking process.

## Business Profile

**Business Name:** ScenePass

**Business Type:** Online event discovery and ticket-booking platform.

**Offerings:**
- Music events and concerts
- Food festivals
- Art exhibitions and workshops
- Comedy shows
- Cultural and student events

**Target Audience:** People interested in discovering and attending events, including students and general event audiences.

**Operating Area:** Lahore and other selected cities represented in the demo event data.

**Main Customer Task:** Find an event, select tickets, and complete a booking.

**Business Goal:** Make event discovery and ticket booking simple and accessible.

## Main Features

- Responsive navigation and homepage.
- Event listings with search functionality.
- Category filtering and city filtering.
- Sorting events by date and ticket price.
- Individual event detail pages.
- Ticket quantity selection.
- Shared ticket availability across event listings and detail pages.
- Booking form with input validation.
- Automatic booking total calculation.
- Sign-in requirement before booking.
- Booking confirmation with a reference number.
- My Bookings page with cancellation functionality.
- Ticket availability restoration after cancellation.
- Persistent demo bookings using browser local storage.
- Loading, error, retry, and empty-result states.

## Business Rules

1. **Ticket Availability:** A customer can book a maximum of 10 tickets per booking. A booking cannot exceed the remaining available seats.
2. **Booking Eligibility:** A customer must sign in before completing a booking.
3. **Pricing:** The booking total is calculated by multiplying the ticket price by the selected quantity. The demo booking fee is Rs 0.

## Technologies Used

- React
- JavaScript
- Vite
- React Router DOM
- HTML
- CSS
- Browser Local Storage

## Installation and Setup

### Prerequisites

- Node.js
- npm

### Install Dependencies

```bash
npm install
```

### Start the Development Server

```bash
npm run dev
```

Open the local URL displayed in your terminal.

### Build the Project

```bash
npm run build
```

### Run ESLint

```bash
npm run lint
```

### Run Automated Business Rule Tests

```bash
node --test
```

## Website Routes

| Route | Description |
|---|---|
| `/` | Homepage |
| `/events` | Explore all events |
| `/events/:id` | Individual event details |
| `/booking` | Ticket booking form |
| `/confirmation` | Booking confirmation |
| `/my-bookings` | View and cancel bookings |
| `/signin` | Demo sign-in page |

## Testing and Edge Cases

The application includes handling for:

- Empty event listings.
- Search queries with no matching results.
- Invalid event IDs.
- Missing booking selections.
- Invalid booking form inputs.
- Booking quantities exceeding available seats.
- Booking attempts without signing in.
- Simulated event-loading failures and retry functionality.
- Booking cancellation and ticket restoration.
- Booking persistence after refreshing the browser.

## Simulated Operations and Limitations

ScenePass is an academic demonstration project.

- Event information is stored in local JavaScript data.
- Booking information and ticket inventory are stored in browser local storage.
- Sign-in is simulated and does not use secure server-side authentication.
- Payments are not processed.
- Event loading is simulated; no live event-service API is connected.
- Bookings are stored locally in the browser and are not shared across devices.

## Project Links

- **GitHub Repository:** [Add your public GitHub repository URL]
- **Live Website:** [Add your deployed website URL]

## Development History

The project is maintained using Git and GitHub. The repository contains the source code, project documentation, and development updates.

## Concept Map

**ScenePass**

- Homepage
  - Navigation
  - Featured Events
  - Event Categories
- Explore Events
  - Search
  - Filters
  - Sorting
- Event Details
  - Event Information
  - Ticket Availability
  - Ticket Selection
- Booking
  - Sign In
  - Customer Information
  - Form Validation
  - Price Calculation
- Confirmation
  - Booking Reference
  - Booking Summary
- My Bookings
  - View Bookings
  - Cancel Booking
  - Restore Ticket Availability
