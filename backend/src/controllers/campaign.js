// controllers/campaign.js
import crypto from 'crypto'

import prisma from '../lib/prisma.js'
import { HttpError } from '../utils/http-error.js'

/* ============================
   GET ALL CAMPAIGNS
============================ */
export async function getAllCampaigns(_req, res) {
  const items = await prisma.campaign.findMany({
    include: {
      user: true,
      Donation: true,
      Raffle: {
        include: {
          RaffleWinner: { include: { user: true } }
        }
      },
      winner: true
    }
  })

  res.status(200).json(
    items.map((c) => ({
      ...c,
      hasWinner: Boolean(c.winner_id)
    }))
  )
}

/* ============================
   GET ONE CAMPAIGN
============================ */
export async function getCampaignById(req, res) {
  const { id } = req.params

  const item = await prisma.campaign.findUnique({
    where: { id },
    include: {
      user: true,
      Donation: { include: { user: true } },
      Raffle: {
        include: {
          RaffleWinner: { include: { user: true } }
        }
      },
      winner: true
    }
  })

  if (!item) throw new HttpError('Campaign not found', 404)

  res.status(200).json({
    ...item,
    hasWinner: Boolean(item.winner_id),
    winner_id: item.winner_id ?? null,
    currentUserId: req.user.id
  })
}

/* ============================
   CREATE CAMPAIGN
============================ */
export async function createCampaign(req, res) {
  const { title, description, target_amount } = req.body

  if (!req.user?.id) throw new HttpError('Unauthorized', 401)

  const created = await prisma.campaign.create({
    data: {
      title,
      description,
      target_amount,
      organizer_id: req.user.id,
      collected_amount: 0,
      status: 'ACTIVE'
    }
  })

  res.status(201).json(created)
}

/* ============================
   UPDATE CAMPAIGN
============================ */
export async function updateCampaign(req, res) {
  const { id } = req.params
  const { title, description, target_amount, status } = req.body

  const existing = await prisma.campaign.findUnique({ where: { id } })
  if (!existing) throw new HttpError('Campaign not found', 404)
  if (existing.organizer_id !== req.user.id)
    throw new HttpError('Forbidden', 403)

  const updated = await prisma.campaign.update({
    where: { id },
    data: {
      title: title ?? existing.title,
      description: description ?? existing.description,
      target_amount:
        typeof target_amount === 'number'
          ? target_amount
          : existing.target_amount,
      status: status ?? existing.status
    }
  })

  res.status(200).json(updated)
}

/* ============================
   DONATE (NO AUTO CLOSE)
============================ */
export async function donateToCampaign(req, res) {
  const { id } = req.params
  const { amount, comment } = req.body

  if (!amount || amount <= 0) throw new HttpError('Invalid amount', 400)

  const campaign = await prisma.campaign.findUnique({ where: { id } })
  if (!campaign) throw new HttpError('Campaign not found', 404)
  if (campaign.status === 'CLOSED')
    throw new HttpError('Campaign already closed', 400)

  const donor = await prisma.user.findUnique({
    where: { id: req.user.id }
  })

  if (!donor) throw new HttpError('User not found', 404)
  if (donor.balance < amount) throw new HttpError('Not enough balance', 400)

  const donation = await prisma.$transaction(async (tx) => {
    const donationRecord = await tx.donation.create({
      data: {
        amount,
        comment: comment || '',
        donor_id: donor.id,
        campaign_id: id,
        transaction_id: crypto.randomUUID()
      }
    })

    await tx.user.update({
      where: { id: donor.id },
      data: { balance: { decrement: amount } }
    })

    await tx.campaign.update({
      where: { id },
      data: { collected_amount: { increment: amount } }
    })

    // ❗ НІЯКОГО АВТОЗАКРИТТЯ ❗
    return donationRecord
  })

  res.status(201).json({
    success: true,
    donation
  })
}

/* ============================
   CLOSE CAMPAIGN (MANUAL ONLY)
============================ */
export async function closeCampaign(req, res) {
  const { id } = req.params

  const existing = await prisma.campaign.findUnique({ where: { id } })
  if (!existing) throw new HttpError('Campaign not found', 404)

  if (existing.organizer_id !== req.user.id)
    throw new HttpError('Forbidden', 403)

  if (existing.status === 'CLOSED') {
    return res.status(200).json(existing)
  }

  const amount = existing.collected_amount || 0

  const updated = await prisma.$transaction(async (tx) => {
    if (amount > 0) {
      await tx.user.update({
        where: { id: existing.organizer_id },
        data: { balance: { increment: amount } }
      })

      await tx.notification.create({
        data: {
          user_id: existing.organizer_id,
          campaign_id: existing.id,
          message: `💰 Кошти ${amount}₴ зараховано на ваш баланс за збір "${existing.title}".`,
          status: 'PENDING'
        }
      })
    }

    return await tx.campaign.update({
      where: { id },
      data: { status: 'CLOSED' }
    })
  })

  res.status(200).json(updated)
}

/* ============================
   RUN RAFFLE
============================ */
export async function runRaffle(req, res) {
  const { id } = req.params

  const campaign = await prisma.campaign.findUnique({
    where: { id },
    include: { Donation: true, user: true }
  })

  if (!campaign) throw new HttpError('Campaign not found', 404)
  if (campaign.organizer_id !== req.user.id)
    throw new HttpError('Forbidden', 403)
  if (campaign.status !== 'CLOSED')
    throw new HttpError('Campaign must be closed before raffle', 400)
  if (campaign.winner_id) throw new HttpError('Raffle already completed', 400)
  if (campaign.Donation.length === 0)
    throw new HttpError('No participants', 400)

  const tickets = campaign.Donation.map((d) => d.donor_id)
  const winnerId = tickets[Math.floor(Math.random() * tickets.length)]

  const result = await prisma.$transaction(async (tx) => {
    const raffle = await tx.raffle.create({
      data: {
        campaign_id: id,
        creator_id: req.user.id,
        description: 'Автоматичний розіграш',
        raffle_date: new Date(),
        winner_count: 1,
        raffle_type: 'ALL',
        status: 'COMPLETED'
      }
    })

    await tx.raffleWinner.create({
      data: { raffle_id: raffle.id, user_id: winnerId }
    })

    const updatedCampaign = await tx.campaign.update({
      where: { id },
      data: { winner_id: winnerId },
      include: { winner: true }
    })

    await tx.notification.create({
      data: {
        user_id: winnerId,
        campaign_id: campaign.id,
        message: `🎉 Вітаємо! Ви перемогли у розіграші.`,
        status: 'PENDING'
      }
    })

    return updatedCampaign
  })

  res.status(200).json({
    success: true,
    winner: result.winner
  })
}

/* ============================
   DELETE CAMPAIGN
============================ */
export async function deleteCampaign(req, res) {
  const { id } = req.params

  const existing = await prisma.campaign.findUnique({
    where: { id },
    include: {
      Donation: true,
      Raffle: { include: { RaffleWinner: true } },
      Notification: true
    }
  })

  if (!existing) throw new HttpError('Campaign not found', 404)
  if (existing.organizer_id !== req.user.id)
    throw new HttpError('Forbidden', 403)

  await prisma.$transaction(async (tx) => {
    for (const raffle of existing.Raffle) {
      await tx.raffleWinner.deleteMany({
        where: { raffle_id: raffle.id }
      })
    }

    await tx.raffle.deleteMany({ where: { campaign_id: id } })
    await tx.donation.deleteMany({ where: { campaign_id: id } })
    await tx.notification.deleteMany({ where: { campaign_id: id } })

    await tx.campaign.delete({ where: { id } })
  })

  res.status(200).json({ success: true, message: 'Campaign deleted' })
}
