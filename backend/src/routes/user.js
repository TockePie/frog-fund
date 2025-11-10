import express from 'express'

import * as UserController from '../controllers/user.js'
import { catchAsync } from '../utils/catch-async.js'

const router = express.Router()

router.get('/', UserController.getAllUsers)
router.post('/', catchAsync(UserController.createUser))

export default router
