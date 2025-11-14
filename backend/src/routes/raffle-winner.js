import express from 'express'

import * as RaffleWinnerController from '../controllers/raffle-winner.js'
import { catchAsync } from '../utils/catch-async.js'

const router = express.Router()

router.get('/', catchAsync(RaffleWinnerController.getAllRaffleWinners))
router.get('/:id', catchAsync(RaffleWinnerController.getRaffleWinnerById))
router.post('/', catchAsync(RaffleWinnerController.createRaffleWinner))
router.delete('/:id', catchAsync(RaffleWinnerController.deleteRaffleWinner))

export default router
