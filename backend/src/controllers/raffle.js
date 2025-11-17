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
  const created = await RaffleService.createRaffle(data)
  const response = RaffleObject.parse(created)
  res.status(201).json(response)
}

export async function deleteRaffle(req, res) {
  const { id } = req.params
  await RaffleService.deleteRaffle(id)
  res.status(204).send()
}

export async function runRaffle(req, res) {
  const { id } = req.params
  const winners = await raffleRunService.runRaffle(id)
  res.status(200).json({
    message: 'Raffle completed',
    winners
  })
}
