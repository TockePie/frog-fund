import { UserObject, UsersArray, UserUpdateObject } from '../models/user.js'
import { UserService } from '../services/user.js'
import { HttpError } from '../utils/http-error.js'

export async function getAllUsers(_req, res) {
  const users = await UserService.getUsers()
  const response = UsersArray.parse(users)
  res.status(200).json(response)
}

export async function updateUsersData(req, res) {
  const { id } = req.params
  const data = UserUpdateObject.parse(req.body)
  const updated = await UserService.updateUsersData(id, data)
  if (!updated) throw new HttpError('User not found', 404)

  const response = UserObject.parse(updated)
  res.status(200).json(response)
}
