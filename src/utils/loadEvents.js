
import events from '../data/events'

// Simulate asynchronous event loading
export function loadEvents(shouldFail = false) {
  return new Promise((resolve, reject) => {

    setTimeout(() => {

      if (shouldFail) {
        reject(new Error('Unable to load events. Please try again.'))
      } else {
        resolve(events)
      }

    }, 1000)

  })
}
