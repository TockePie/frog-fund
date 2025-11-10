import prisma from './prisma.js'

export class NotificationService {
    async getAll() {
        return await prisma.notification.findMany()
    }

    async getById(id) {
        return await prisma.notification.findUnique({ where: { id } })
    }

    async create(data) {
        return await prisma.notification.create({ data })
    }

    async update(id, data) {
        return await prisma.notification.update({ where: { id }, data })
    }

    async delete(id) {
        return await prisma.notification.delete({ where: { id } })
    }
}
