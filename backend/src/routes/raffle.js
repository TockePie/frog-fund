import express from 'express'

import * as RaffleController from '../controllers/raffle.js'
import { catchAsync } from '../utils/catch-async.js'

const router = express.Router()

router.get('/', catchAsync(RaffleController.getAllRaffles))
router.get('/:id', catchAsync(RaffleController.getRaffleById))
router.post('/', catchAsync(RaffleController.createRaffle))
router.delete('/:id', catchAsync(RaffleController.deleteRaffle))

export default router
