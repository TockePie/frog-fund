import { UserService } from '../services/user.js'

const userService = new UserService()

async function getAllUsers(_req, res) {
  try {
    const users = await userService.getUsers()
    res.status(200).json(users)
  } catch (error) {
    console.error('Error fetching users:', error)
    res.status(500).json({ error: 'Failed to fetch users' })
  }
}

export default {
  getAllUsers
}
