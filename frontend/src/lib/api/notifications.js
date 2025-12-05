// lib/api/notifications.js
import apiInstance from "."

// Отримати всі нотифікації користувача
export function getNotifications() {
  return apiInstance.get("/notifications")
}

// Позначити одну нотифікацію як прочитану
export function markNotificationAsRead(id) {
  return apiInstance.put(`/notifications/${id}/read`)
}

// Позначити всі нотифікації як прочитані
export function markAllNotificationsAsRead() {
  return apiInstance.put("/notifications/read-all")
}
