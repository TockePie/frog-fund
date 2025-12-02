import axios from "axios";
import Cookies from "js-cookie";

const apiInstance = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true
});

apiInstance.interceptors.request.use((config) => {
  const token = Cookies.get("jwt");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default apiInstance;
