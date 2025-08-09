// src/services/authApi.js

import axios from "axios";

const API_URL = "https://yna-nexus-api.onrender.com";

const authApi = axios.create({
  baseURL: API_URL,
});

const setAuthToken = (token) => {
  authApi.defaults.headers.common.Authorization = `Bearer ${token}`;
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
  const response = await authApi.get("/auth/refresh");
  return response.data;
};

export const authService = {
  setAuthToken,
  clearAuthToken,
  register,
  login,
  logout,
  refresh,
};
