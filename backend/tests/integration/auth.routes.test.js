// backend/tests/integration/auth.routes.test.js
import request from 'supertest'

import app from '../../src/index.js'

describe('Auth Routes', () => {
  const uniqueEmail = `test-${Date.now()}@example.com`

  it('POST /auth/signup → 201', async () => {
    const res = await request(app)
      .post('/auth/signup')
      .send({ name: 'Test', email: uniqueEmail, password: '12345678' })
    expect(res.statusCode).toBe(201)
    expect(res.body).toHaveProperty('token')
  })

  it('POST /auth/login → 200', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({ email: uniqueEmail, password: '12345678' })
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveProperty('token')
  })
})
