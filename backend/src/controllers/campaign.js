import { CampaignService } from '../services/campaign.js'

const service = new CampaignService()

async function getAll(req, res) {
  try {
    const items = await service.getAll()
    res.status(200).json(items)
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).json({ error: 'Failed to fetch users' })
  }
}

async function getById(req, res) {
  try {
    const { id } = req.params
    const item = await service.getById(id)
    if (!item) return res.status(404).json({ error: 'User not found' })
    res.status(200).json(item)
  } catch (error) {
    console.error('Error fetching user:', error)
    res.status(500).json({ error: 'Failed to fetch user' })
  }
}

async function create(req, res) {
  try {
    const created = await service.create(req.body)
    res.status(201).json(created)
  } catch (error) {
    console.error('Error creating user:', error)
    res.status(500).json({ error: 'Failed to create user' })
  }
}

async function update(req, res) {
  try {
    const { id } = req.params
    const updated = await service.update(id, req.body)
    res.status(200).json(updated)
  } catch (error) {
    console.error('Error updating user:', error)
    res.status(500).json({ error: 'Failed to update user' })
  }
}

async function remove(req, res) {
  try {
    const { id } = req.params
    await service.delete(id)
    res.status(204).send()
  } catch (error) {
    console.error('Error deleting user:', error)
    res.status(500).json({ error: 'Failed to delete user' })
  }
}

export default { getAll, getById, create, update, remove }
