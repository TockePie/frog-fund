import express from 'express'

import * as UserController from '../controllers/user.js'
import { authMiddleware } from '../middlewares/auth.js'
import { catchAsync } from '../utils/catch-async.js'

const router = express.Router()

// 1) Повернути поточного юзера
router.get('/me', authMiddleware, catchAsync(UserController.getMe))

// 2) Отримання юзера по id
router.get('/:id', catchAsync(UserController.getUserById))

// 3) Всі юзери
router.get('/', catchAsync(UserController.getAllUsers))

router.post('/', catchAsync(UserController.createUser))
router.put('/:id', authMiddleware, catchAsync(UserController.updateUsersData))
router.delete('/:id', authMiddleware, catchAsync(UserController.deleteUser))

export default router
