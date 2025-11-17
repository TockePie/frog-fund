import express from 'express'

import * as UserController from '../controllers/user.js'
import { authMiddleware } from '../middlewares/auth.js'
import { catchAsync } from '../utils/catch-async.js'

const router = express.Router()

router.get('/', catchAsync(UserController.getAllUsers))
router.put('/:id', authMiddleware, catchAsync(UserController.updateUsersData))

export default router
