import { UserBodyObject } from '../models/user.js'
import { AuthService } from '../services/auth.js'

export async function logIn(req, res) {
  const result = await AuthService.logIn(req.body)
  res.status(200).json(result)
}

export async function singUp(req, res) {
  const body = UserBodyObject.parse(req.body)
  const result = await AuthService.signUp(body)
  res.status(201).json(result)
}
