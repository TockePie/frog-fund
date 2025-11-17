import express from 'express'

import * as UserController from '../controllers/user.js'
import { authMiddleware } from '../middlewares/auth.js'
import { catchAsync } from '../utils/catch-async.js'

const router = express.Router()

router.get('/', catchAsync(UserController.getAllUsers))
router.get('/:id', catchAsync(UserController.getUserById))
router.post('/', catchAsync(UserController.createUser))
router.put('/:id', catchAsync(UserController.updateUser))
router.delete('/:id', catchAsync(UserController.deleteUser))

export default router
