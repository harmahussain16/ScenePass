# ScenePass – Event Discovery & Ticket Booking

## Student Details

- **Student Name:** Harma Hussain
- **Roll Number:** 24I-2032
- **Section:** CY-B
- **Course:** Web Programming
- **Course Code:** CS4032
- **Program:** BS Cyber Security
- **Semester:** Fall 2026
- **Assignment:** 02
- **Business Name:** ScenePass

## Project Description

ScenePass is a React-based event discovery and ticket-booking website. It allows customers to explore events, search and filter available options, view event details, select tickets, complete a booking form, and manage their bookings.

The project focuses on making event discovery and ticket booking simple through clear event information, shared ticket availability, useful form validation, and helpful feedback.

## Project Links

- **GitHub Repository:** https://github.com/harmahussain16/ScenePass
- **Live Website:** https://scene-pass-peach.vercel.app

## Business Profile

- **Business Name:** ScenePass
- **Business Type:** Online event discovery and ticket-booking platform.
- **Offerings:** Music events, food festivals, art exhibitions, workshops, comedy shows, cultural events, and student events.
- **Target Audience:** Students and people interested in discovering and attending events.
- **Operating Area:** Selected cities represented in the local event data, including Lahore.
- **Main Customer Task:** Find an event, select tickets, and complete a booking.
- **Business Goal:** Make event discovery and ticket booking convenient and understandable.

## Technologies Used

- React
- JavaScript
- Vite
- React Router DOM
- HTML
- CSS
- Browser Local Storage
- Node.js built-in test runner

## Main Features

- Responsive homepage and navigation.
- Event listings with 10 local event records.
- Event search by relevant information.
- Category and city filtering.
- Sorting by date and ticket price.
- Individual event detail pages.
- Ticket quantity selection.
- Shared ticket inventory across event listings and details.
- Maximum 10 tickets per booking.
- Sign-in requirement before booking.
- Controlled booking form with validation.
- Automatic booking total calculation.
- Booking confirmation with reference number.
- My Bookings page.
- Booking cancellation and ticket restoration.
- Persistent demo booking data using local storage.
- Loading, error, retry, and empty-result states.

## Website Routes

| Route | Purpose |
|---|---|
| `/` | Homepage and featured events |
| `/events` | Explore, search, filter, and sort events |
| `/events/:id` | View individual event details |
| `/booking` | Enter booking information and confirm tickets |
| `/confirmation` | View booking confirmation |
| `/my-bookings` | View and cancel bookings |
| `/signin` | Demo sign-in |

## Business Rules

### 1. Ticket Availability

A customer can book a maximum of 10 tickets per booking. The requested quantity must also be within the available seat count.

### 2. Booking Eligibility

A customer must sign in before completing a booking.

### 3. Pricing

The booking total is calculated by multiplying ticket price by the selected quantity. The demo booking fee is Rs 0.

## Installation and Setup

### Prerequisites

- Node.js
- npm

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

Open the local URL displayed in the terminal.

### Build for Production

```bash
npm run build
```

### Run ESLint

```bash
npm run lint
```

### Run Automated Business Rule Tests

```bash
node --test src/utils/bookingRules.test.mjs
```

The automated tests check:
- A valid booking.
- Booking exactly 10 tickets.
- Rejection of a booking exceeding the 10-ticket limit.

## Reproducing Edge Cases

The following steps can be used to demonstrate the application's validation and recovery behaviour.

| Edge case | Steps to reproduce | Expected behaviour |
|---|---|---|
| No matching events | Open Explore Events and search for a term that does not match an event | No Events Found message and Clear Filters option |
| Empty dataset | Test with an empty event data array | No Events Available message |
| Invalid event ID | Open `/events/9999` | Useful invalid-event feedback |
| Invalid booking form | Submit the booking form with missing or invalid fields | Specific validation messages appear |
| More than 10 tickets | Attempt to book 11 tickets | Booking is rejected with a maximum-limit message |
| Insufficient seats | Attempt a quantity greater than the available seats | Booking is rejected with an availability message |
| Booking without sign-in | Sign out and attempt to continue with a booking | Sign-in requirement is displayed |
| Loading failure | Enable the loading-failure testing control on Explore Events and trigger the test | Error message and retry option appear |
| Loading recovery | Disable the simulated failure and retry loading | Events load successfully |
| Booking cancellation | Open My Bookings and cancel a booking | Booking is removed and its seats are restored |
| Persistence | Complete a booking and refresh the browser | Saved booking information is restored |

## Automated Testing

The business-rule validation function is separated from browser-specific inventory logic.

**Business-rule module:** `src/utils/bookingRules.mjs`

**Test file:** `src/utils/bookingRules.test.mjs`

The tests use Node.js built-in modules:
- `node:test`
- `node:assert/strict`

The recorded test run completed with three passing tests and zero failures.

## Concept Map

| Concept | File | Component or function |
|---|---|---|
| Application entry point | `src/main.jsx` | React application rendering and BrowserRouter |
| Application routing | `src/App.jsx` | App and Route components |
| Navigation | `src/components/Navbar.jsx` | Navbar |
| Homepage | `src/components/Hero.jsx` | Hero |
| Event categories | `src/components/Categories.jsx` | Categories |
| Featured events | `src/components/FeaturedEvents.jsx` | FeaturedEvents |
| Event data | `src/data/events.js` | Events data array |
| Event listing | `src/pages/Events.jsx` | Events |
| Event cards | `src/components/EventCard.jsx` | EventCard |
| Event details | `src/pages/EventDetails.jsx` | EventDetails |
| Shared inventory | `src/utils/inventory.js` | getInventory, getAvailableSeats, reserveTickets, releaseTickets |
| Business-rule validation | `src/utils/bookingRules.mjs` | validateTicketQuantity |
| Automated tests | `src/utils/bookingRules.test.mjs` | ScenePass booking rules test suite |
| Mock asynchronous loading | `src/utils/loadEvents.js` | Event loading function |
| Booking form | `src/pages/Booking.jsx` | Booking |
| Sign-in | `src/pages/SignIn.jsx` | SignIn |
| Confirmation | `src/pages/Confirmation.jsx` | Confirmation |
| Booking management | `src/pages/MyBookings.jsx` | MyBookings |
| Global styling | `src/index.css` | Global styles |
| Application styling | `src/App.css` | Application styles |

## Simulated Operations and Known Limitations

ScenePass is an academic frontend demonstration project.

- Event information is stored in local JavaScript data.
- Event loading is simulated using an asynchronous mock loader.
- Bookings and inventory are stored in browser local storage.
- Sign-in is simulated and does not use secure server-side authentication.
- Payments are not processed.
- No live event-service API or backend database is connected.
- Bookings are stored locally in the browser and are not shared across devices.
- The application does not provide real ticket issuance or payment processing.

## Development History

The project is maintained using Git and GitHub. The repository contains the React source code, local data, assets, styles, business-rule validation, automated tests, and project documentation.


## Project Links

- **GitHub Repository:** https://github.com/harmahussain16/ScenePass
- **Live Website:** https://scene-pass-peach.vercel.app