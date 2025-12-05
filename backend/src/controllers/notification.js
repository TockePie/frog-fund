// controllers/notification.js
import prisma from '../prisma.js'
import { HttpError } from '../utils/http-error.js'

/* ============================
   GET USER NOTIFICATIONS
============================ */
export async function getNotifications(req, res) {
  const items = await prisma.notification.findMany({
    where: { user_id: req.user.id },
    orderBy: { id: 'desc' } // без createdAt, тому сортуємо просто по id
  })

  res.status(200).json(items)
}

/* ============================
   MARK ONE AS READ
============================ */
export async function markNotificationAsRead(req, res) {
  const { id } = req.params

  const notif = await prisma.notification.findUnique({
    where: { id }
  })

  if (!notif) throw new HttpError('Notification not found', 404)
  if (notif.user_id !== req.user.id) throw new HttpError('Forbidden', 403)

  const updated = await prisma.notification.update({
    where: { id },
    data: { status: 'SENT' } // SENT = прочитано
  })

  res.status(200).json(updated)
}

/* ============================
   MARK ALL AS READ
============================ */
export async function markAllNotificationsAsRead(req, res) {
  await prisma.notification.updateMany({
    where: {
      user_id: req.user.id,
      status: 'PENDING'
    },
    data: { status: 'SENT' }
  })

  res.status(200).json({ success: true })
}
