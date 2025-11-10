import prisma from './prisma.js'

export class CampaignService {
    async getAll() {
        return await prisma.campaign.findMany()
    }

    async getById(id) {
        return await prisma.campaign.findUnique({ where: { id } })
    }

    async create(data) {
        return await prisma.campaign.create({ data })
    }

    async update(id, data) {
        return await prisma.campaign.update({ where: { id }, data })
    }

    async delete(id) {
        return await prisma.campaign.delete({ where: { id } })
    }
}
