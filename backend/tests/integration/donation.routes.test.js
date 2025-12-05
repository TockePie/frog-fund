import request from 'supertest'

import app from '../../src/index.js'

describe('Donation Routes', () => {
  it('GET /donations → 200', async () => {
    const res = await request(app).get('/donations')
    expect(res.statusCode).toBe(200)
  })
})
