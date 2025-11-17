import {
  DonationBodyObject,
  DonationObject,
  DonationsArray
} from '../models/donation.js'
import { DonationService } from '../services/donation.js'
import { HttpError } from '../utils/http-error.js'

export async function getAllDonations(_req, res) {
  const items = await DonationService.getAllDonations()
  const response = DonationsArray.parse(items)
  res.status(200).json(response)
}

export async function getDonationById(req, res) {
  const { id } = req.params
  const item = await DonationService.getDonations(id)
  if (!item) {
    throw new HttpError('Donation not found', 404)
  }
  const response = DonationObject.parse(item)
  res.status(200).json(response)
}

export async function createDonation(req, res) {
  const data = DonationBodyObject.parse(req.body)
  const created = await DonationService.createDonation(data)
  const response = DonationObject.parse(created)
  res.status(201).json(response)
}

export async function deleteDonation(req, res) {
  const { id } = req.params
  await DonationService.deleteDonation(id)
  res.status(204).send()
}
