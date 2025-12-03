import express from 'express'

import * as CampaignController from '../controllers/campaign.js'
import { authMiddleware } from '../middlewares/auth.js'
import { catchAsync } from '../utils/catch-async.js'

const router = express.Router()

router.get('/', catchAsync(CampaignController.getAllCampaigns))

router.get(
  '/:id',
  authMiddleware,
  catchAsync(CampaignController.getCampaignById)
)

router.post('/', authMiddleware, catchAsync(CampaignController.createCampaign))

router.put(
  '/:id',
  authMiddleware,
  catchAsync(CampaignController.updateCampaign)
)

router.put(
  '/:id/close',
  authMiddleware,
  catchAsync(CampaignController.closeCampaign)
)

router.delete(
  '/:id',
  authMiddleware,
  catchAsync(CampaignController.deleteCampaign)
)

router.post(
  '/:id/donate',
  authMiddleware,
  catchAsync(CampaignController.donateToCampaign)
)

// ⭐ ПРОВЕСТИ РОЗІГРАШ
router.post(
  '/:id/raffle',
  authMiddleware,
  catchAsync(CampaignController.runRaffle)
)

export default router
