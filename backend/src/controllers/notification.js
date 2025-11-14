import { NotificationService } from '../services/notification.js'

const notificationService = new NotificationService()

export async function getAllNotifications(_req, res) {
  const items = await notificationService.getNotifications()
  res.status(200).json(items)
}

export async function createNotification(req, res) {
  const data = req.body
  const created = await notificationService.createNotification(data)
  res.status(201).json(created)
}
