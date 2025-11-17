import express from 'express'

import * as DonationController from '../controllers/donation.js'
import { authMiddleware } from '../middlewares/auth.js'
import { catchAsync } from '../utils/catch-async.js'

const router = express.Router()

router.get('/', catchAsync(DonationController.getAllDonations))
router.get('/:id', catchAsync(DonationController.getDonationById))
router.post('/', authMiddleware, catchAsync(DonationController.createDonation))
router.delete(
  '/:id',
  authMiddleware,
  catchAsync(DonationController.deleteDonation)
)

export default router
