
import { describe, it } from 'node:test'
import assert from 'node:assert/strict'

import { validateTicketQuantity } from './bookingRules.mjs'

describe('ScenePass booking rules', () => {

  it('allows a valid booking', () => {
    const result = validateTicketQuantity(3, 20)

    assert.equal(result.success, true)
  })

  it('allows booking exactly 10 tickets', () => {
    const result = validateTicketQuantity(10, 20)

    assert.equal(result.success, true)
  })

  it('rejects booking more than 10 tickets', () => {
    const result = validateTicketQuantity(11, 20)

    assert.equal(result.success, false)
    assert.equal(
      result.message,
      'You can book a maximum of 10 tickets per booking.'
    )
  })

})
