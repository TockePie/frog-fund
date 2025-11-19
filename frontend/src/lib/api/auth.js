import apiInstance from '.'

export function logIn(email, password) {
  return apiInstance.post('/login', { email, password })
}
