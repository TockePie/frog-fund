import express from 'express'

import * as AuthController from '../controllers/auth.js'
import { catchAsync } from '../utils/catch-async.js'

const router = express.Router()

router.post('/signup', catchAsync(AuthController.signUp))
router.post('/login', catchAsync(AuthController.logIn))

export default router
