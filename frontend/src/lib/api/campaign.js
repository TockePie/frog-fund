import apiInstance from ".";

// Створити банку
export function createCampaign(data) {
  return apiInstance.post("/campaigns", data);
}

// Отримати одну банку
export function getCampaignById(id) {
  return apiInstance.get(`/campaigns/${id}`);
}

// 🔥 ОТРИМАТИ ВСІ БАНКИ (для сторінки сортування / списку)
export function getAllCampaigns() {
  return apiInstance.get("/campaigns");
}

// Закрити банку
export function closeCampaign(id) {
  return apiInstance.put(`/campaigns/${id}`, { status: "CLOSED" });
}
