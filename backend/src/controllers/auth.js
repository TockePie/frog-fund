import { AuthService } from '../services/auth.js'

const authService = new AuthService()

export async function singUp(req, res) {
  const result = await authService.signUp(req.body)
  res.status(201).json(result)
}

export async function logIn(req, res) {
  const result = await authService.logIn(req.body)
  res.status(200).json(result)
}
