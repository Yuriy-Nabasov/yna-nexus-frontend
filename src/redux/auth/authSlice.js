// src/redux/auth/authSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { register, logIn, logOut, refreshUser } from "./authOperations";
import {
  fetchCollectedStamps,
  addCollectedStamp,
  removeCollectedStamp,
  fetchDesiredStamps,
  addDesiredStamp,
  removeDesiredStamp,
  fetchExchangeStamps,
  addExchangeStamp,
  removeExchangeStamp,
} from "../user/userOperations";

const initialState = {
  user: {
    collectedStamps: [],
    desiredStamps: [],
    exchangeStamps: [],
  },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  // error: null,
  isProcessing: false,
  userError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Редюсери для аутентифікації
      .addCase(register.pending, (state) => {
        state.isRefreshing = true;
        state.isProcessing = true;
        state.userError = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        const { user, accessToken } = action.payload;
        state.user = user;
        state.token = accessToken;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        // state.error = null;
        state.isProcessing = false;
        state.userError = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isRefreshing = false;
        // state.error = action.payload;
        state.isProcessing = false;
        state.userError = action.payload;
      })
      .addCase(logIn.pending, (state) => {
        state.isRefreshing = true;
        state.isProcessing = true;
        state.userError = null;
      })
      .addCase(logIn.fulfilled, (state, action) => {
        const { user, accessToken } = action.payload;
        state.user = user;
        state.token = accessToken;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        // state.error = null;
        state.isProcessing = false;
        state.userError = null;
      })
      .addCase(logIn.rejected, (state, action) => {
        state.isRefreshing = false;
        // state.error = action.payload;
        state.isProcessing = false;
        state.userError = action.payload;
      })
      .addCase(logOut.pending, (state) => {
        state.isRefreshing = true;
        state.isProcessing = true;
        state.userError = null;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
        // state.error = null;
        state.isProcessing = false;
        state.userError = null;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.isRefreshing = false;
        // state.error = action.payload;
        state.isProcessing = false;
        state.userError = action.payload;
      })
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
        state.isProcessing = true;
        state.userError = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.accessToken;
        state.isLoggedIn = true;
        state.isRefreshing = false;
        // state.error = null;
        state.isProcessing = false;
        state.userError = null;
      })
      .addCase(refreshUser.rejected, (state) => {
        state.isRefreshing = false;
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
        state.isProcessing = false;
        state.userError = null;
      })

      // Редюсери для колекції зібраних марок
      // Обробка успішного додавання/видалення марки до/з колекції
      .addCase(fetchCollectedStamps.pending, (state) => {
        state.isProcessing = true;
        state.userError = null;
      })
      .addCase(fetchCollectedStamps.fulfilled, (state, action) => {
        state.isProcessing = false;
        if (state.user) {
          state.user.collectedStamps = action.payload.map((stamp) => stamp._id);
        }
      })
      .addCase(fetchCollectedStamps.rejected, (state, action) => {
        state.isProcessing = false;
        state.userError = action.payload;
      })

      .addCase(addCollectedStamp.pending, (state) => {
        state.isProcessing = true;
        state.userError = null;
      })
      .addCase(addCollectedStamp.fulfilled, (state, action) => {
        state.isProcessing = false;
        if (state.user) {
          state.user.collectedStamps = action.payload.map((stamp) => stamp._id);
        }
      })
      .addCase(addCollectedStamp.rejected, (state, action) => {
        state.isProcessing = false;
        state.userError = action.payload;
      })

      .addCase(removeCollectedStamp.pending, (state) => {
        state.isProcessing = true;
        state.userError = null;
      })
      .addCase(removeCollectedStamp.fulfilled, (state, action) => {
        state.isProcessing = false;
        if (state.user) {
          state.user.collectedStamps = action.payload.map((stamp) => stamp._id);
        }
      })
      .addCase(removeCollectedStamp.rejected, (state, action) => {
        state.isProcessing = false;
        state.userError = action.payload;
      })

      // Обробка успішного додавання марки до бажаної колекції
      .addCase(fetchDesiredStamps.pending, (state) => {
        state.isProcessing = true;
        state.userError = null;
      })
      .addCase(fetchDesiredStamps.fulfilled, (state, action) => {
        state.isProcessing = false;
        if (state.user) {
          state.user.desiredStamps = action.payload.map((stamp) => stamp._id);
        }
      })
      .addCase(fetchDesiredStamps.rejected, (state, action) => {
        state.isProcessing = false;
        state.userError = action.payload;
      })

      .addCase(addDesiredStamp.pending, (state) => {
        state.isProcessing = true;
        state.userError = null;
      })
      .addCase(addDesiredStamp.fulfilled, (state, action) => {
        state.isProcessing = false;
        if (state.user) {
          state.user.desiredStamps = action.payload.map((stamp) => stamp._id);
        }
      })
      .addCase(addDesiredStamp.rejected, (state, action) => {
        state.isProcessing = false;
        state.userError = action.payload;
      })

      // Обробка успішного видалення марки з бажаної колекції
      .addCase(removeDesiredStamp.pending, (state) => {
        state.isProcessing = true;
        state.userError = null;
      })
      .addCase(removeDesiredStamp.fulfilled, (state, action) => {
        state.isProcessing = false;
        if (state.user) {
          state.user.desiredStamps = action.payload.map((stamp) => stamp._id);
        }
      })
      .addCase(removeDesiredStamp.rejected, (state, action) => {
        state.isProcessing = false;
        state.userError = action.payload;
      })

      // Обробка успішного додавання марки до переліку для обміну
      .addCase(fetchExchangeStamps.pending, (state) => {
        state.isProcessing = true;
        state.userError = null;
      })
      .addCase(fetchExchangeStamps.fulfilled, (state, action) => {
        state.isProcessing = false;
        if (state.user) {
          state.user.exchangeStamps = action.payload.map((stamp) => stamp._id);
        }
      })
      .addCase(fetchExchangeStamps.rejected, (state, action) => {
        state.isProcessing = false;
        state.userError = action.payload;
      })

      .addCase(addExchangeStamp.pending, (state) => {
        state.isProcessing = true;
        state.userError = null;
      })
      .addCase(addExchangeStamp.fulfilled, (state, action) => {
        state.isProcessing = false;
        if (state.user) {
          state.user.exchangeStamps = action.payload.map((stamp) => stamp._id);
        }
      })
      .addCase(addExchangeStamp.rejected, (state, action) => {
        state.isProcessing = false;
        state.userError = action.payload;
      })

      // Обробка успішного видалення марки з переліку для обміну
      .addCase(removeExchangeStamp.pending, (state) => {
        state.isProcessing = true;
        state.userError = null;
      })
      .addCase(removeExchangeStamp.fulfilled, (state, action) => {
        state.isProcessing = false;
        if (state.user) {
          state.user.exchangeStamps = action.payload.map((stamp) => stamp._id);
        }
      })
      .addCase(removeExchangeStamp.rejected, (state, action) => {
        state.isProcessing = false;
        state.userError = action.payload;
      });
  },
});

export const authReducer = authSlice.reducer;
