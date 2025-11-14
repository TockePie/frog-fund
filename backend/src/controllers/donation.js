import {
  DonationBodyObject,
  DonationObject,
  DonationsArray
} from '../models/donation.js'
import { DonationService } from '../services/donation.js'

const donationService = new DonationService()

export async function getAllDonations(_req, res) {
  const items = await donationService.getAllDonations()
  const response = DonationsArray.parse(items)
  res.status(200).json(response)
}

export async function getDonationById(req, res) {
  const { id } = req.params
  const item = await donationService.getDonations(id)
  if (!item) {
    const err = new Error('Donation not found')
    err.status = 404
    throw err
  }
  const response = DonationObject.parse(item)
  res.status(200).json(response)
}

export async function createDonation(req, res) {
  const data = DonationBodyObject.parse(req.body)
  const created = await donationService.createDonation(data)
  const response = DonationObject.parse(created)
  res.status(201).json(response)
}

export async function deleteDonation(req, res) {
  const { id } = req.params
  await donationService.deleteDonation(id)
  res.status(204).send()
}
