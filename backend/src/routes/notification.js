// routes/notifications.js
import express from 'express'

import * as NotificationController from '../controllers/notification.js'
import { authMiddleware } from '../middlewares/auth.js'
import { catchAsync } from '../utils/catch-async.js'

const router = express.Router()

router.get(
  '/',
  authMiddleware,
  catchAsync(NotificationController.getNotifications)
)

router.put(
  '/:id/read',
  authMiddleware,
  catchAsync(NotificationController.markNotificationAsRead)
)

router.put(
  '/read-all',
  authMiddleware,
  catchAsync(NotificationController.markAllNotificationsAsRead)
)

export default router
