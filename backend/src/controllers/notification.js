import { NotificationService } from '../services/notification.js'

//TODO: Create a function to get all notifications for specific user.

export async function getAllNotifications(_req, res) {
  const items = await NotificationService.getNotifications()
  res.status(200).json(items)
}

//XXX: Notification should be created during selecting the winners of a raffle. Remove and add this logic in corresponding place.
export async function createNotification(req, res) {
  const data = req.body
  const created = await NotificationService.createNotification(data)
  res.status(201).json(created)
}
