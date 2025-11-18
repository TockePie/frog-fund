import {
  RaffleBodyObject,
  RaffleObject,
  RafflesArray
} from '../models/raffle.js'
import { RaffleService } from '../services/raffle.js'
import raffleRunService from '../services/raffleRunService.js'
import { HttpError } from '../utils/http-error.js'

export async function getAllRaffles(_req, res) {
  const items = await RaffleService.getRaffles()
  const response = RafflesArray.parse(items)
  res.status(200).json(response)
}

export async function getRaffleById(req, res) {
  const { id } = req.params
  const item = await RaffleService.getRaffle(id)
  if (!item) {
    throw new HttpError('Raffle not found', 404)
  }
  const response = RaffleObject.parse(item)
  res.status(200).json(response)
}

export async function createRaffle(req, res) {
  const data = RaffleBodyObject.parse(req.body)
  if (!req.user || !req.user.id) throw new HttpError('Unauthorized', 401)
  const payload = {
    description: data.description,
    raffle_date: data.raffle_date,
    winner_count: data.winner_count,
    raffle_type: data.raffle_type,
    status: 'PENDING',
    creator: {
      connect: { id: req.user.id }
    },
    campaign: {
      connect: { id: data.campaign_id }
    }
  }
  const created = await RaffleService.createRaffle(payload)
  const response = RaffleObject.parse(created)
  res.status(201).json(response)
}

export async function deleteRaffle(req, res) {
  const { id } = req.params
  const existing = await RaffleService.getRaffle(id)
  if (!existing) throw new HttpError('Raffle not found', 404)
  if (!req.user || req.user.id !== existing.creator_id) {
    throw new HttpError('Forbidden', 403)
  }

  await RaffleService.deleteRaffle(id)
  res.status(204).send()
}

export async function runRaffle(req, res) {
  const { id } = req.params
  const existing = await RaffleService.getRaffle(id)
  if (!existing) throw new HttpError('Raffle not found', 404)
  if (!req.user || req.user.id !== existing.creator_id) {
    throw new HttpError('Forbidden', 403)
  }
  const winners = await raffleRunService.runRaffle(id)
  res.status(200).json({
    message: 'Raffle completed',
    winners
  })
}
