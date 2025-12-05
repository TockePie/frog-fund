// routes/campaign.js
import express from 'express'

import * as CampaignController from '../controllers/campaign.js'
import { authMiddleware } from '../middlewares/auth.js'
import { catchAsync } from '../utils/catch-async.js'

const router = express.Router()

// Усі збори
router.get('/', catchAsync(CampaignController.getAllCampaigns))

// Один збір
router.get(
  '/:id',
  authMiddleware,
  catchAsync(CampaignController.getCampaignById)
)

// Створити збір
router.post('/', authMiddleware, catchAsync(CampaignController.createCampaign))

// Оновити збір
router.put(
  '/:id',
  authMiddleware,
  catchAsync(CampaignController.updateCampaign)
)

// Закрити збір (ручне закриття)
router.put(
  '/:id/close',
  authMiddleware,
  catchAsync(CampaignController.closeCampaign)
)

// Видалити збір
router.delete(
  '/:id',
  authMiddleware,
  catchAsync(CampaignController.deleteCampaign)
)

// Задонатити
router.post(
  '/:id/donate',
  authMiddleware,
  catchAsync(CampaignController.donateToCampaign)
)

// Провести розіграш
router.post(
  '/:id/raffle',
  authMiddleware,
  catchAsync(CampaignController.runRaffle)
)

export default router
