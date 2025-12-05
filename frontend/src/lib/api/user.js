import apiInstance from ".";

// Отримати інформацію про поточного користувача
export function getMe() {
  return apiInstance.get("/users/me");
}
