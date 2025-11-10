import express from 'express'

import campaignRoutes from './campaign.js'
import donationRoutes from './donation.js'
import notificationRoutes from './notification.js'
import raffleRoutes from './raffle.js'
import raffleWinnerRoutes from './raffleWinner.js'
import userRoutes from './user.js'

const router = express.Router()

router.use('/users', userRoutes)
router.use('/campaigns', campaignRoutes)
router.use('/donations', donationRoutes)
router.use('/notifications', notificationRoutes)
router.use('/raffles', raffleRoutes)
router.use('/raffle-winners', raffleWinnerRoutes)

export default router
