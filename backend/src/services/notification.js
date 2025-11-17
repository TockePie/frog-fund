import prisma from '../utils/prisma.js'

export class NotificationService {
  static async getNotifications() {
    return await prisma.notification.findMany()
  }

  static async createNotification(data) {
    return await prisma.notification.create({ data })
  }
}
