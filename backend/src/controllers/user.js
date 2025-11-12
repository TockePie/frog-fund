import { UserBodyObject, UserObject, UsersArray } from '../models/user.js'
import { UserService } from '../services/user.js'

const userService = new UserService()

export async function getAllUsers(_req, res) {
  const users = await userService.getUsers()
  const response = UsersArray.parse(users)
  res.status(200).json(response)
}

export async function createUser(req, res) {
  const data = UserBodyObject.parse(req.body)
  const user = await userService.createUser(data)
  const response = UserObject.parse(user)
  res.status(201).json(response)
}
