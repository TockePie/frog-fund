import jwt from 'jsonwebtoken'

import { HttpError } from '../utils/http-error.js'

const JWT_SECRET = process.env.JWT_SECRET || 'super-secret-key'

export function authMiddleware(req, res, next) {
  const header = req.headers.authorization
  if (!header) throw new HttpError('Missing token', 401)

  const token = header.replace('Bearer ', '')

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded
    next()
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token' })
  }
}
