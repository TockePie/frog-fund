/* eslint-disable no-unused-vars */
import { ZodError } from 'zod'

import { Prisma } from '../generated/prisma/index.js'

export default function errorHandler(err, req, res, next) {
  console.error(err)

  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Validation failed',
      details: JSON.parse(err.message)
    })
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      return res
        .status(409)
        .json({ error: 'Duplicate field', fields: err.meta.target })
    }
    return res.status(400).json({ error: 'Database error', code: err.code })
  }

  if (err.name === 'HttpError') {
    return res.status(err.statusCode).json({
      error: err.message
    })
  }

  res.status(500).json({
    error: 'Internal Server Error'
  })
}
