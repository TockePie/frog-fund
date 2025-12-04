import express from 'express'

import AuthRoutes from './auth.js'
import CampaignRoutes from './campaign.js'
import DonationRoutes from './donation.js'
import NotificationRoutes from './notification.js'
import UserRoutes from './user.js'

const router = express.Router()

router.use('/auth', AuthRoutes)
router.use('/users', UserRoutes)
router.use('/campaigns', CampaignRoutes)
router.use('/donations', DonationRoutes)

router.use('/notifications', NotificationRoutes)

export default router
