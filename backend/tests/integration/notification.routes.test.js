import request from 'supertest'

import app from '../../src/index.js'
import { createTestToken } from '../utils/jwt.js'

describe('Notification Routes', () => {
  const token = createTestToken()

  it('GET /notifications → 200 (with auth)', async () => {
    const res = await request(app)
      .get('/notifications')
      .set('Authorization', `Bearer ${token}`)
    expect(res.statusCode).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it('PUT /notifications/read-all → 200', async () => {
    const res = await request(app)
      .put('/notifications/read-all')
      .set('Authorization', `Bearer ${token}`)
    expect(res.statusCode).toBe(200)
    expect(res.body.success).toBe(true)
  })
})
