// src/redux/user/userOperations.js

import { createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
// Імпортуємо налаштований екземпляр authApi, який додає Authorization header
import { authService } from "../../services/authApi";

// Отримуємо екземпляр axios, який вже налаштовано в корені проєкту
// const axiosInstance = axios;

// Всі URL-адреси
const API_BASE_URL = "https://yna-nexus-api.onrender.com";

// Асинхронна операція для отримання всіх марок у колекції користувача
export const fetchCollectedStamps = createAsyncThunk(
  "user/fetchCollectedStamps",
  async (_, { rejectWithValue }) => {
    try {
      // const response = await axios.get(
      //   `https://yna-nexus-api.onrender.com/users/me/collected-stamps`
      // );
      // const response = await axiosInstance.get(
      //   `${API_BASE_URL}/users/me/collected-stamps`
      // );
      // const response = await axios.get(
      //   `${API_BASE_URL}/users/me/collected-stamps`
      // );
      console.log("Виконую запит на отримання колекції марок...");
      const response = await authService.authApi.get(
        `${API_BASE_URL}/users/me/collected-stamps`
      );
      console.log("Колекцію успішно отримано!", response);
      return response.data.data.collectedStamps;
    } catch (error) {
      console.error("Помилка отримання колекції:", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Асинхронна операція для додавання марки до колекції
export const addCollectedStamp = createAsyncThunk(
  "user/addCollectedStamp",
  async (stampId, { rejectWithValue }) => {
    console.log("Початок додавання марки. Stamp ID:", stampId);
    try {
      // await axios.post(
      //   `https://yna-nexus-api.onrender.com/users/me/collected-stamps/${stampId}`
      // );
      // await axiosInstance.post(
      //   `${API_BASE_URL}/users/me/collected-stamps/${stampId}`
      // );
      // await axios.post(`${API_BASE_URL}/users/me/collected-stamps/${stampId}`);
      // Використовуємо налаштований екземпляр axios
      await authService.authApi.post(
        `${API_BASE_URL}/users/me/collected-stamps/${stampId}`
      );
      console.log("Марку успішно додано до колекції!");
      // Важливо повертати ID для оновлення стану Redux
      return { stampId };
    } catch (error) {
      console.error("Помилка додавання марки:", error);
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Асинхронна операція для видалення марки з колекції
export const removeCollectedStamp = createAsyncThunk(
  "user/removeCollectedStamp",
  async (stampId, { rejectWithValue }) => {
    console.log("Початок видалення марки. Stamp ID:", stampId);
    try {
      // await axios.delete(
      //   `https://yna-nexus-api.onrender.com/users/me/collected-stamps/${stampId}`
      // );
      // await axiosInstance.delete(
      //   `${API_BASE_URL}/users/me/collected-stamps/${stampId}`
      // );
      // await axios.delete(
      //   `${API_BASE_URL}/users/me/collected-stamps/${stampId}`
      // );
      // Використовуємо налаштований екземпляр axios
      await authService.authApi.delete(
        `${API_BASE_URL}/users/me/collected-stamps/${stampId}`
      );
      console.log("Марку успішно видалено з колекції!");
      // Важливо повертати ID для оновлення стану Redux
      return { stampId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
