import axios from "axios";
import { refreshToken } from "../utils/refresh-token";

const axiosGet = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosGet.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosGet.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 498 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const access_token = await refreshToken();
        originalRequest.headers.Authorization = `Bearer ${access_token}`;

        return axiosGet(originalRequest);
      } catch (refreshError) {
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosGet;
