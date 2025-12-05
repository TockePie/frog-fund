// backend/tests/utils/jwt.js
import jwt from 'jsonwebtoken'

export function createTestToken(
  userId = '00000000-0000-0000-0000-000000000001'
) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined')
  }
  return jwt.sign(
    { id: userId, email: 'test@example.com' },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  )
}
