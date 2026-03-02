// lib/api/campaign.js
import apiInstance from "."

export function createCampaign(data) {
  return apiInstance.post("/campaigns", data)
}

export function getCampaignById(id) {
  return apiInstance.get(`/campaigns/${id}`)
}

export function getAllCampaigns() {
  return apiInstance.get("/campaigns")
}

export function closeCampaign(id) {
  return apiInstance.put(`/campaigns/${id}/close`)
}

export function donateToCampaign(id, data) {
  return apiInstance.post(`/campaigns/${id}/donate`, data)
}

export function runRaffle(id) {
  return apiInstance.post(`/campaigns/${id}/raffle`)
}

export function deleteCampaign(id) {
  return apiInstance.delete(`/campaigns/${id}`)
}
