import express from 'express'

import * as RaffleController from '../controllers/raffle.js'
import { authMiddleware } from '../middlewares/auth.js'
import { catchAsync } from '../utils/catch-async.js'

const router = express.Router()

router.get('/', catchAsync(RaffleController.getAllRaffles))
router.get('/:id', catchAsync(RaffleController.getRaffleById))
router.post('/', authMiddleware, catchAsync(RaffleController.createRaffle))
router.post('/run/:id', authMiddleware, catchAsync(RaffleController.runRaffle))
router.delete('/:id', authMiddleware, catchAsync(RaffleController.deleteRaffle))

export default router
