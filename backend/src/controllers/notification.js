import { NotificationService } from '../services/notification.js'
import { HttpError } from '../utils/http-error.js'

export async function getAllNotifications(req, res) {
  if (!req.user || !req.user.id) throw new HttpError('Unauthorized', 401)
  const items = await NotificationService.getNotificationsByUser(req.user.id)
  res.status(200).json(items)
}

export async function createNotification(req, res) {
  if (!req.user || !req.user.id) throw new HttpError('Unauthorized', 401)
  const data = { ...req.body, user_id: req.user.id }
  const created = await NotificationService.createNotification(data)
  res.status(201).json(created)
}
