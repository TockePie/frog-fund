import {
  RaffleBodyObject,
  RaffleObject,
  RafflesArray
} from '../models/raffle.js'
import { RaffleService } from '../services/raffle.js'

const raffleService = new RaffleService()

export async function getAllRaffles(_req, res) {
  const items = await raffleService.getRaffles()
  const response = RafflesArray.parse(items)
  res.status(200).json(response)
}

export async function getRaffleById(req, res) {
  const { id } = req.params
  const item = await raffleService.getRaffle(id)
  if (!item) {
    const err = new Error('Raffle not found')
    err.status = 404
    throw err
  }
  const response = RaffleObject.parse(item)
  res.status(200).json(response)
}

export async function createRaffle(req, res) {
  const data = RaffleBodyObject.parse(req.body)
  const created = await raffleService.createRaffle(data)
  const response = RaffleObject.parse(created)
  res.status(201).json(response)
}

export async function deleteRaffle(req, res) {
  const { id } = req.params
  await raffleService.deleteRaffle(id)
  res.status(204).send()
}
