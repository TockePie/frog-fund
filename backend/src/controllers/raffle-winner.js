import {
  RaffleWinnerBodyObject,
  RaffleWinnerObject,
  RaffleWinnersArray
} from '../models/raffle-winner.js'
import { RaffleWinnerService } from '../services/raffle-winner.js'

const raffleWinnerService = new RaffleWinnerService()

export async function getAllRaffleWinners(_req, res) {
  const winners = await raffleWinnerService.getRaffleWinners()
  const response = RaffleWinnersArray.parse(winners)
  res.status(200).json(response)
}

export async function getRaffleWinnerById(req, res) {
  const { id } = req.params
  const item = await raffleWinnerService.getRaffleWinner(id)
  if (!item) {
    const err = new Error('RaffleWinner not found')
    err.status = 404
    throw err
  }
  const response = RaffleWinnerObject.parse(item)
  res.status(200).json(response)
}

export async function createRaffleWinner(req, res) {
  const data = RaffleWinnerBodyObject.parse(req.body)
  const created = await raffleWinnerService.createRaffleWinner(data)
  const response = RaffleWinnerObject.parse(created)
  res.status(201).json(response)
}

export async function deleteRaffleWinner(req, res) {
  const { id } = req.params
  await raffleWinnerService.deleteRaffleWinner(id)
  res.status(204).send()
}
