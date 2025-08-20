// src/redux/user/userOperations.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../services/authApi";

const API_BASE_URL = "https://yna-nexus-api.onrender.com";

// --- ОПЕРАЦІЇ ДЛЯ КОЛЕКЦІЇ ЗІБРАНИХ МАРОК ---
// Асинхронна операція для отримання всіх марок у колекції користувача
export const fetchCollectedStamps = createAsyncThunk(
  "user/fetchCollectedStamps",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.authApi.get(
        `${API_BASE_URL}/users/me/collected-stamps`
      );
      return response.data.data.collectedStamps;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Асинхронна операція для додавання марки до колекції
export const addCollectedStamp = createAsyncThunk(
  "user/addCollectedStamp",
  async (stampId, { rejectWithValue }) => {
    try {
      const response = await authService.authApi.post(
        `${API_BASE_URL}/users/me/collected-stamps/${stampId}`
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Асинхронна операція для видалення марки з колекції
export const removeCollectedStamp = createAsyncThunk(
  "user/removeCollectedStamp",
  async (stampId, { rejectWithValue }) => {
    try {
      const response = await authService.authApi.delete(
        `${API_BASE_URL}/users/me/collected-stamps/${stampId}`
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// --- ОПЕРАЦІЇ ДЛЯ БАЖАНОЇ КОЛЕКЦІЇ ---
// Отримати всі бажані марки
export const fetchDesiredStamps = createAsyncThunk(
  "user/fetchDesiredStamps",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.authApi.get(
        `${API_BASE_URL}/users/me/desired-stamps`
      );
      return response.data.data.desiredStamps;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Асинхронна операція для додавання марки до бажаної колекції
export const addDesiredStamp = createAsyncThunk(
  "user/addDesiredStamp",
  async (stampId, { rejectWithValue }) => {
    try {
      const response = await authService.authApi.post(
        `${API_BASE_URL}/users/me/desired-stamps/${stampId}`
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Асинхронна операція для видалення марки з бажаної колекції
export const removeDesiredStamp = createAsyncThunk(
  "user/removeDesiredStamp",
  async (stampId, { rejectWithValue }) => {
    try {
      const response = await authService.authApi.delete(
        `${API_BASE_URL}/users/me/desired-stamps/${stampId}`
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// --- ОПЕРАЦІЇ ДЛЯ ОБМІНУ ---
// Отримати всі марки для обміну
export const fetchExchangeStamps = createAsyncThunk(
  "user/fetchExchangeStamps",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.authApi.get(
        `${API_BASE_URL}/users/me/exchange-stamps`
      );
      return response.data.data.exchangeStamps;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Асинхронна операція для додавання марки до переліку для обміну
export const addExchangeStamp = createAsyncThunk(
  "user/addExchangeStamp",
  async (stampId, { rejectWithValue }) => {
    try {
      const response = await authService.authApi.post(
        `${API_BASE_URL}/users/me/exchange-stamps/${stampId}`
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Асинхронна операція для видалення марки з переліку для обміну
export const removeExchangeStamp = createAsyncThunk(
  "user/removeExchangeStamp",
  async (stampId, { rejectWithValue }) => {
    try {
      const response = await authService.authApi.delete(
        `${API_BASE_URL}/users/me/exchange-stamps/${stampId}`
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
