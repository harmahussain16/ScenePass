import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Categories from './components/Categories'
import FeaturedEvents from './components/FeaturedEvents'
import Events from './pages/Events'
import EventDetails from './pages/EventDetails'
import Booking from './pages/Booking'
import Confirmation from './pages/Confirmation'
import MyBookings from './pages/MyBookings'
import SignIn from './pages/SignIn'
import './App.css'

function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedEvents />
    </>
  )
}

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </>
  )
}

export default App
