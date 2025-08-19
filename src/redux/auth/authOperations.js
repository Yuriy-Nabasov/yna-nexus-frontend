// src/redux/auth/authOperations.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../services/authApi";

// Helper function to clean the token string from quotes
const cleanToken = (token) => {
  if (
    typeof token === "string" &&
    token.startsWith('"') &&
    token.endsWith('"')
  ) {
    return token.slice(1, -1);
  }
  return token;
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const res = await authService.register(credentials);
      res.data.accessToken = cleanToken(res.data.accessToken);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/logIn",
  async (credentials, thunkAPI) => {
    try {
      const res = await authService.login(credentials);
      const cleanedToken = cleanToken(res.data.accessToken);
      authService.setAuthToken(cleanedToken);
      res.data.accessToken = cleanedToken;
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logOut", async (_, thunkAPI) => {
  try {
    await authService.logout();
    authService.clearAuthToken();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (!persistedToken) {
      return thunkAPI.rejectWithValue("No token found");
    }

    try {
      const res = await authService.refresh();
      res.data.accessToken = cleanToken(res.data.accessToken);
      authService.setAuthToken(res.data.accessToken);
      return res.data;
    } catch (error) {
      authService.clearAuthToken();
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
