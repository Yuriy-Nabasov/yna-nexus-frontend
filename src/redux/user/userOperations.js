// src/redux/user/userOperations.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../services/authApi";

const API_BASE_URL = "https://yna-nexus-api.onrender.com";

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
