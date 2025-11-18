import prisma from '../utils/prisma.js'

//TODO: Create a function to get all notifications for specific user.
export class NotificationService {
  static async getNotifications() {
    return await prisma.notification.findMany()
  }

  static async createNotification(data) {
    return await prisma.notification.create({ data })
  }
}
