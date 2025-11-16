import express from 'express'

import campaignRoutes from './campaign.js'
import donationRoutes from './donation.js'
import notificationRoutes from './notification.js'
import raffleRoutes from './raffle.js'
import userRoutes from './user.js'

const router = express.Router()

router.use('/users', userRoutes)
router.use('/campaigns', campaignRoutes)
router.use('/donations', donationRoutes)
router.use('/raffles', raffleRoutes)
router.use('/notifications', notificationRoutes)

export default router
