/* eslint-disable no-unused-vars */
import { ZodError } from 'zod'

export default function errorHandler(err, req, res, next) {
  console.error(err)

  if (err instanceof ZodError) {
    return res.status(400).json({
      error: 'Validation failed',
      details: JSON.parse(err.message)
    })
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
