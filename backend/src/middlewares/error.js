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

  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  })
}
