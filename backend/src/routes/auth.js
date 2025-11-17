import express from 'express'

import * as AuthController from '../controllers/auth.js'
import { catchAsync } from '../utils/catch-async.js'

const router = express.Router()

router.post('/singup', catchAsync(AuthController.singUp))
router.post('/login', catchAsync(AuthController.logIn))

export default router
