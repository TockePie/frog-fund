import prisma from '../utils/prisma.js'

export class NotificationService {
  async getNotifications() {
    return await prisma.notification.findMany()
  }

  async createNotification(data) {
    return await prisma.notification.create({ data })
  }
}
