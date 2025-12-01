// TODO: Create signIn function with corresponding fetch

import apiInstance from "."

export function logIn({ email, password }) {
  return apiInstance.post("/auth/login", { email, password })
}

// ⭐ ДОДАЄМО signUp — ПРАЦЮЄ З API
export function signUp({ name, email, password }) {
  return apiInstance.post("/auth/register", {
    name,
    email,
    password,
  })
}
