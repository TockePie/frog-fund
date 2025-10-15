import { UserService } from '../services/user.js'

const userService = new UserService()

function getAllUsers(_req, res) {
  const users = userService.getUsers()

  res.status(200).json(users)
}

export default {
  getAllUsers
}
