import express from 'express'

import * as CampaignController from '../controllers/campaign.js'
import { catchAsync } from '../utils/catch-async.js'

const router = express.Router()

router.get('/', catchAsync(CampaignController.getAllCampaigns))
router.get('/:id', catchAsync(CampaignController.getCampaignById))
router.post('/', catchAsync(CampaignController.createCampaign))
router.put('/:id', catchAsync(CampaignController.updateCampaign))
router.delete('/:id', catchAsync(CampaignController.deleteCampaign))

export default router
