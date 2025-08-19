// src/services/authApi.js

import axios from "axios";

const API_URL = "https://yna-nexus-api.onrender.com";

// Екземпляр axios для авторизованих запитів
const authApi = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

const setAuthToken = (token) => {
  if (token) {
    // Видаляємо зайві лапки, якщо вони є.
    const cleanedToken = token.replace(/^"(.*)"$/, "$1");
    authApi.defaults.headers.common.Authorization = `Bearer ${cleanedToken}`;
  }
};

const clearAuthToken = () => {
  delete authApi.defaults.headers.common.Authorization;
};

const register = async (userData) => {
  const response = await authApi.post("/auth/register", userData);
  return response.data;
};

const login = async (userData) => {
  const response = await authApi.post("/auth/login", userData);
  return response.data;
};

const logout = async () => {
  await authApi.post("/auth/logout");
};

const refresh = async () => {
  const response = await authApi.post("/auth/refresh");
  return response.data;
};

// Експортуємо authApi разом з іншими сервісами
export const authService = {
  authApi,
  setAuthToken,
  clearAuthToken,
  register,
  login,
  logout,
  refresh,
};
