import axios from "axios";
import * as SecureStore from "expo-secure-store";

const api = axios.create({
  baseURL: "https://backend.trothalo.click",
  timeout: 30000,
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    const accessToken = await SecureStore.getItemAsync("accessToken");

    if (accessToken && typeof accessToken === "string") {
      const cleanedToken = accessToken.replace(/^"(.*)"$/, "$1");
      config.headers["Authorization"] = `Bearer ${cleanedToken}`;
    } else {
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    return response?.data;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await api.post("/api/v1/auth/refresh");
        return api(originalRequest);
      } catch (refreshError) {
        console.log("Lỗi:", refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
