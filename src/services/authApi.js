// src/services/authApi.js

import axios from "axios";

const API_URL = "https://yna-nexus-api.onrender.com";

const authApi = axios.create({
  baseURL: API_URL,
  // Додаємо цю опцію, щоб axios автоматично відправляв cookies
  // разом з крос-доменними запитами.
  withCredentials: true,
});

const setAuthToken = (token) => {
  // authApi.defaults.headers.common.Authorization = `Bearer ${token}`;
  if (token) {
    authApi.defaults.headers.common.Authorization = `Bearer ${token}`;
    console.log(
      "authApi.js: Auth header set for authApi instance.",
      authApi.defaults.headers.common.Authorization
    );
  }
};

const clearAuthToken = () => {
  delete authApi.defaults.headers.common.Authorization;
  console.log("authApi.js: Auth header cleared for authApi instance.");
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
  console.log("authApi.js: Attempting to refresh with authApi instance.");
  const response = await authApi.post("/auth/refresh");
  console.log(
    "authApi.js: Attempting to refresh with authApi instance.",
    response
  );
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
