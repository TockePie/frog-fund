import express from 'express'

import AuthRoutes from './auth.js'
import CampaignRoutes from './campaign.js'
import DonationRoutes from './donation.js'
import NotificationRoutes from './notification.js'
import RaffleRoutes from './raffle.js'
import UserRoutes from './user.js'

const router = express.Router()

router.use('/users', UserRoutes)
router.use('/campaigns', CampaignRoutes)
router.use('/donations', DonationRoutes)
router.use('/raffles', RaffleRoutes)
router.use('/notifications', NotificationRoutes)
router.use('/auth', AuthRoutes)

export default router
