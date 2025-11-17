import { NotificationService } from '../services/notification.js'

export async function getAllNotifications(_req, res) {
  const items = await NotificationService.getNotifications()
  res.status(200).json(items)
}

export async function createNotification(req, res) {
  const data = req.body
  const created = await NotificationService.createNotification(data)
  res.status(201).json(created)
}
