import apiInstance from ".";

export function createCampaign(data) {
  return apiInstance.post("/campaigns", data);
}

export function getCampaignById(id) {
  return apiInstance.get(`/campaigns/${id}`);
}

export function closeCampaign(id) {
  return apiInstance.put(`/campaigns/${id}`, { status: "CLOSED" });
}
