import apiInstance from ".";

// Створити банку
export function createCampaign(data) {
  return apiInstance.post("/campaigns", data);
}

// Отримати одну банку
export function getCampaignById(id) {
  return apiInstance.get(`/campaigns/${id}`);
}

// Отримати всі банки
export function getAllCampaigns() {
  return apiInstance.get("/campaigns");
}

// Закрити банку
export function closeCampaign(id) {
  return apiInstance.put(`/campaigns/${id}/close`);
}

// Донат у банку
export function donateToCampaign(id, data) {
  return apiInstance.post(`/campaigns/${id}/donate`, data);
}

// 🔥 Провести розіграш
export function runRaffle(id) {
  return apiInstance.post(`/campaigns/${id}/raffle`);
}
