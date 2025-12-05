import prisma from '../prisma.js'
import { HttpError } from '../utils/http-error.js'
import { DonationService } from './donation.js'
import { NotificationService } from './notification.js'
import { RaffleService } from './raffle.js'

export class RaffleRunService {
  static async runRaffle(raffleId) {
    const raffle = await RaffleService.getRaffle(raffleId)
    if (!raffle) throw new HttpError('Raffle not found', 404)
    const { raffle_type, campaign_id, winner_count } = raffle

    const donations = await DonationService.getDonationsByCampaign(campaign_id)
    if (donations.length === 0) {
      throw new HttpError('No donations to this campaign', 404)
    }

    let winners = []
    switch (raffle_type) {
      case 'ALL': {
        winners = this.pickAll(donations, winner_count)
        break
      }
      case 'MULTIPLE': {
        winners = this.pickMultiple(donations, winner_count)
        break
      }
      case 'TOP': {
        winners = this.pickTop(donations, winner_count)
        break
      }
      default: {
        throw new HttpError('Unknown raffle type', 400)
      }
    }

    await prisma.raffleWinner.createMany({
      data: winners.map((w) => ({
        raffle_id: raffleId,
        user_id: w.user.id
      }))
    })

    for (const win of winners) {
      await NotificationService.createNotification({
        user_id: win.user.id,
        message: `Ви перемогли!`,
        status: 'PENDING'
      })
    }

    await RaffleService.updateRaffle(raffleId, { status: 'COMPLETED' })

    return winners.map((w) => ({ user: w.user, amount: w.amount }))
  }

  static pickAll(donations, count) {
    const shuffled = [...donations].sort(() => Math.random() - 0.5)
    return shuffled.slice(0, count)
  }

  static pickMultiple(donations, count) {
    const pool = []

    for (const d of donations) {
      const multiplier = Math.max(1, Math.floor(d.amount / 50))
      for (let i = 0; i < multiplier; i++) {
        pool.push(d)
      }
    }

    const selected = []
    for (let i = 0; i < count && pool.length > 0; i++) {
      const idx = Math.floor(Math.random() * pool.length)
      selected.push(pool[idx])
      pool.splice(idx, 1)
    }

    return selected
  }

  static pickTop(donations, count) {
    return [...donations].sort((a, b) => b.amount - a.amount).slice(0, count)
  }
}
