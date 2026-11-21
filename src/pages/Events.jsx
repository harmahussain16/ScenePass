
import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { loadEvents } from '../utils/loadEvents'
import EventCard from '../components/EventCard'
import './Events.css'

function Events() {
  const [search, setSearch] = useState('')
  const [city, setCity] = useState('All')
  const [sort, setSort] = useState('date')

  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [simulateFailure, setSimulateFailure] = useState(false)

  const [searchParams, setSearchParams] = useSearchParams()

  const category = searchParams.get('category') || 'All'

  // Load events asynchronously
  const fetchEvents = useCallback(async (shouldFail = false) => {
    setLoading(true)
    setError('')

    try {
      const data = await loadEvents(shouldFail)
      setEvents(data)
    } catch (err) {
      setEvents([])
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  // Load events when the page opens
  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  // Retry loading events
  const handleRetry = () => {
    fetchEvents(simulateFailure)
  }

  // Update category in URL
  const handleCategoryChange = (value) => {
    const newParams = new URLSearchParams(searchParams)

    if (value === 'All') {
      newParams.delete('category')
    } else {
      newParams.set('category', value)
    }

    setSearchParams(newParams)
  }

  // Search, filter and sort events
  const filteredEvents = events
    .filter((event) => {
      const searchText = search.toLowerCase()

      const matchesSearch =
        event.title.toLowerCase().includes(searchText) ||
        event.city.toLowerCase().includes(searchText) ||
        event.venue.toLowerCase().includes(searchText) ||
        event.description.toLowerCase().includes(searchText)

      const matchesCategory =
        category === 'All' || event.category === category

      const matchesCity =
        city === 'All' || event.city === city

      return matchesSearch && matchesCategory && matchesCity
    })
    .sort((a, b) => {
      if (sort === 'price-low') {
        return a.price - b.price
      }

      if (sort === 'price-high') {
        return b.price - a.price
      }

      if (sort === 'date') {
        return new Date(a.date) - new Date(b.date)
      }

      return 0
    })

  // Clear all filters
  const clearFilters = () => {
    setSearch('')
    setCity('All')
    setSort('date')
    setSearchParams({})
  }

  return (
    <main className="events-page">

      <section className="events-header">
        <p className="section-tag">FIND YOUR NEXT EXPERIENCE</p>

        <h1>Explore Events</h1>

        <p>
          Discover exciting experiences happening across Pakistan.
        </p>
      </section>

      {/* Loading failure demonstration control */}
      <section className="loading-demo-control">
        <label>
          <input
            type="checkbox"
            checked={simulateFailure}
            onChange={(e) => setSimulateFailure(e.target.checked)}
          />
          Simulate loading failure (Testing)
        </label>

        <button
          type="button"
          onClick={() => fetchEvents(simulateFailure)}
          disabled={loading}
        >
          Test Loading
        </button>
      </section>

      {loading ? (

        <div className="events-loading" role="status">
          <h2>Loading Events...</h2>
          <p>Please wait while we find exciting experiences for you.</p>
        </div>

      ) : error ? (

        <div className="events-error" role="alert">
          <h2>Unable to Load Events</h2>
          <p>{error}</p>

          <button onClick={handleRetry}>
            Try Again
          </button>
        </div>

      ) : (

        <>

          <section className="events-controls">

            <div className="search-control">
              <label htmlFor="event-search">Search events</label>

              <input
                id="event-search"
                type="text"
                placeholder="Search by event, city or venue..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="filter-control">
              <label htmlFor="category-filter">Category</label>

              <select
                id="category-filter"
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                <option value="All">All Categories</option>
                <option value="Concerts">Concerts</option>
                <option value="Festivals">Festivals</option>
                <option value="Workshops">Workshops</option>
                <option value="Exhibitions">Exhibitions</option>
                <option value="Comedy Shows">Comedy Shows</option>
                <option value="University Events">University Events</option>
              </select>
            </div>

            <div className="filter-control">
              <label htmlFor="city-filter">City</label>

              <select
                id="city-filter"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="All">All Cities</option>
                <option value="Islamabad">Islamabad</option>
                <option value="Lahore">Lahore</option>
                <option value="Karachi">Karachi</option>
              </select>
            </div>

            <div className="filter-control">
              <label htmlFor="sort-events">Sort by</label>

              <select
                id="sort-events"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="date">Date: Earliest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

          </section>

          <section className="events-results">

            <div className="results-heading">
              <h2>{category === 'All' ? 'All Events' : category}</h2>
              <p>{filteredEvents.length} events found</p>
            </div>

            
            {events.length === 0 ? (

              <div className="no-events">
                <h3>No Events Available</h3>
                <p>
                  There are currently no events available.
                  Please check again later.
                </p>
              </div>

            ) : filteredEvents.length > 0 ? (

              <div className="listing-grid">

                {filteredEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}

              </div>

            ) : (

              <div className="no-events">
                <h3>No Events Found</h3>

                <p>
                  No events match your current search or filters.
                  Try changing your search or selecting different filters.
                </p>

                <button onClick={clearFilters}>
                  Clear Filters
                </button>
              </div>

            )}


          </section>

        </>

      )}

    </main>
  )
}

export default Events
