
import events from '../data/events'
import EventCard from './EventCard'
import './FeaturedEvents.css'

function FeaturedEvents() {

  const featuredEvents = events.filter(
    (event) => event.featured
  )

  return (
    <section className="featured-section">

      <div className="featured-heading">
        <div>
          <p className="section-tag">DON'T MISS OUT</p>

          <h2>Featured Events</h2>

          <p className="featured-description">
            Handpicked experiences you don't want to miss.
          </p>
        </div>

        <span className="featured-count">
          {featuredEvents.length} FEATURED EVENTS
        </span>
      </div>

      <div className="events-grid">

        {featuredEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
          />
        ))}

      </div>

    </section>
  )
}

export default FeaturedEvents
