import express from 'express'

import * as NotificationController from '../controllers/notification.js'
import { authMiddleware } from '../middlewares/auth.js'
import { catchAsync } from '../utils/catch-async.js'

const router = express.Router()

router.get('/', catchAsync(NotificationController.getAllNotifications))
router.post(
  '/',
  authMiddleware,
  catchAsync(NotificationController.createNotification)
)

export default router
