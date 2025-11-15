import express from 'express'

import AuthRoutes from './auth.js'
import UserRoutes from './user.js'

const router = express.Router()

router.get('/', (_req, res) => {
  res.send('This is the API root!')
})

router.use('/users', UserRoutes)
router.use('/auth', AuthRoutes)

export default router
