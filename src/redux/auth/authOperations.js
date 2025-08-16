// src/redux/auth/authOperations.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../services/authApi";
// import axios from "axios";

// const setAuthHeader = (token) => {
//   axios.defaults.headers.common.Authorization = `Bearer ${token}`;
// };

// const clearAuthHeader = () => {
//   axios.defaults.headers.common.Authorization = "";
// };

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const res = await authService.register(credentials);
      // console.log("res: ", res);
      // setAuthHeader(res.data.token);
      // authService.setAuthToken(res.data.token);
      // authService.setAuthToken(res.data.accessToken);
      // authService.setAuthToken(res.data.data.accessToken);
      // authService.setAuthToken(res.data.accessToken);
      // return res.data;
      // return res.data.data;
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
      // console.log("logIn: Successful API response:", res);
      console.log("logIn: Successful API response:", res.data);
      // setAuthHeader(res.data.token);
      // authService.setAuthToken(res.data.token);
      // authService.setAuthToken(res.data.accessToken);
      // authService.setAuthToken(res.data.data.accessToken);
      authService.setAuthToken(res.data.accessToken);
      // authService.setAuthToken(res.data.data.accessToken);
      // console.log("logIn: Token set from response.data.token", res.data);
      // console.log("logIn: Token set from response.data.data", res.data.data);
      console.log("logIn: Token set from response.data", res.data);
      // return res.data;
      // return res.data.data;
      return res.data;
      // return res.data.data;
    } catch (error) {
      console.error("logIn: Error during login:", error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logOut", async (_, thunkAPI) => {
  try {
    await authService.logout();
    // clearAuthHeader();
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

    console.log("refreshUser: Redux state token:", persistedToken);

    if (!persistedToken) {
      console.log(
        "refreshUser: No persisted token found. Skipping refresh."
        // persistedToken
      );
      return thunkAPI.rejectWithValue("No token foundr");
    }

    // setAuthHeader(persistedToken);
    authService.setAuthToken(persistedToken);

    console.log("refreshUser: Persisted token found and set.");

    return persistedToken;

    // try {
    //   console.log(
    //     "refreshUser: Attempting to get user data with existing token."
    //   );
    //   const res = await authService.refresh();
    //   console.log("refreshUser: Successful API response:", res);

    // Використовуємо новий токен, якщо він є у відповіді.
    // if (res.data.data && res.data.data.accessToken) {
    //   authService.setAuthToken(res.data.data.accessToken);
    //   console.log("refreshUser: New token received and set.");
    // }

    // return res.data;
    //   return res.data.data;
    // } catch (error) {
    //   console.error("refreshUser: Failed to refresh. Clearing token.", error);
    //   // clearAuthHeader();
    //   authService.clearAuthToken();
    //   return thunkAPI.rejectWithValue(error.message);
    // }
  }
);
