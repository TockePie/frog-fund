// backend/tests/integration/campaign.routes.test.js
import request from 'supertest'

import app from '../../src/index.js'
import { createTestToken } from '../utils/jwt.js'

describe('Campaign Routes', () => {
  const token = createTestToken()

  it('GET /campaigns → 200', async () => {
    const res = await request(app).get('/campaigns')
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('POST /campaigns → 201 (with auth)', async () => {
    const res = await request(app)
      .post('/campaigns')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test', description: 'Help frogs', target_amount: 500 })
    expect(res.statusCode).toBe(201)
  })

  it('POST /campaigns/:id/donate → 201', async () => {
    const res = await request(app)
      .post('/campaigns/campaign-1/donate')
      .set('Authorization', `Bearer ${token}`)
      .send({ amount: 100, comment: 'Frogs!' })
    expect(res.statusCode).toBe(201)
  })
})
