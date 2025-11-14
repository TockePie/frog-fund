import { UserBodyObject, UserObject, UsersArray } from '../models/user.js'
import { UserService } from '../services/user.js'

const userService = new UserService()

export async function getAllUsers(_req, res) {
  const users = await userService.getUsers()
  const response = UsersArray.parse(users)
  res.status(200).json(response)
}

export async function getUserById(req, res) {
  const { id } = req.params
  const user = await userService.getUser(id)
  if (!user) {
    const err = new Error('User not found')
    err.status = 404
    throw err
  }
  const response = UserObject.parse(user)
  res.status(200).json(response)
}

export async function createUser(req, res) {
  const data = UserBodyObject.parse(req.body)
  const created = await userService.createUser(data)
  const response = UserObject.parse(created)
  res.status(201).json(response)
}

export async function updateUser(req, res) {
  const { id } = req.params
  const data = req.body
  const updated = await userService.updateUser(id, data)
  if (!updated) {
    const err = new Error('User not found')
    err.status = 404
    throw err
  }
  const response = UserObject.parse(updated)
  res.status(200).json(response)
}

export async function deleteUser(req, res) {
  const { id } = req.params
  await userService.deleteUser(id)
  res.status(204).send()
}
