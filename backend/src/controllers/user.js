import {
  UserBodyObject,
  UserObject,
  UsersArray,
  UserUpdateObject
} from '../models/user.js'
import { UserService } from '../services/user.js'
import { HttpError } from '../utils/http-error.js'

export async function getAllUsers(_req, res) {
  const users = await UserService.getUsers()
  const response = UsersArray.parse(users)
  if (response.length === 0) throw new HttpError('Users not found', 404)

  res.status(200).json(response)
}

export async function getUserById(req, res) {
  const { id } = req.params
  const user = await UserService.getUserById(id)
  if (!user) throw new HttpError('User not found', 404)

  const response = UserObject.parse(user)
  res.status(200).json(response)
}

//XXX: User can't create an account without authorization. FIX!
export async function createUser(req, res) {
  const data = UserBodyObject.parse(req.body)
  const created = await UserService.createUser(data)
  const response = UserObject.parse(created)
  res.status(201).json(response)
}

//XXX: User can update someone's else data with their token. Implement validation of user_id from request headers
export async function updateUsersData(req, res) {
  const { id } = req.params
  const data = UserUpdateObject.parse(req.body)
  const updated = await UserService.updateUserData(id, data)
  if (!updated) throw new HttpError('User not found', 404)

  const response = UserObject.parse(updated)
  res.status(200).json(response)
}

//XXX: User can delete someone's else data with their token. Implement validation of user_id from request headers
export async function deleteUser(req, res) {
  const { id } = req.params
  await UserService.deleteUser(id)
  res.status(204).send()
}
