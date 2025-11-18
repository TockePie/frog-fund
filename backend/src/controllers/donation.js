import {
  DonationBodyObject,
  DonationObject,
  DonationsArray
} from '../models/donation.js'
import { DonationService } from '../services/donation.js'
import { HttpError } from '../utils/http-error.js'

/* XXX
ESLint:

Property 'getAllDonations' may not exist on type 'typeof DonationService'. Did you mean 'getDonations'?
*/
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

//XXX: User can't create a donation because the body doesn't contain user_id. Implement validation of user_id from request headers
export async function createDonation(req, res) {
  const data = DonationBodyObject.parse(req.body)
  const created = await DonationService.createDonation(data)
  const response = DonationObject.parse(created)
  res.status(201).json(response)
}

//XXX: User can delete someone's else data with their token. Implement validation of user_id from request headers
export async function deleteDonation(req, res) {
  const { id } = req.params
  await DonationService.deleteDonation(id)
  res.status(204).send()
}
