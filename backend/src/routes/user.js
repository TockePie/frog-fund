import express from 'express'

import * as UserController from '../controllers/user.js'
import { authMiddleware } from '../middlewares/auth.js'
import { catchAsync } from '../utils/catch-async.js'

const router = express.Router()

router.get('/', catchAsync(UserController.getAllUsers))
router.get('/:id', catchAsync(UserController.getUserById))
//XXX: User can't create an account without authorization. FIX!
router.post('/', authMiddleware, catchAsync(UserController.createUser))
router.put('/:id', authMiddleware, catchAsync(UserController.updateUsersData))
router.delete('/:id', authMiddleware, catchAsync(UserController.deleteUser))

export default router
