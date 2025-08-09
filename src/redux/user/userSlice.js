// src/redux/user/userSlice.js

import { createSlice } from "@reduxjs/toolkit";
import { fetchCollectedStamps } from "./userOperations";

const userSlice = createSlice({
  name: "user",
  initialState: {
    collectedStamps: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    // Редюсер для додавання марки до колекції (використовується після успішного API-запиту)
    addCollectedStamp: (state, action) => {
      if (!state.collectedStamps.includes(action.payload)) {
        state.collectedStamps.push(action.payload);
      }
    },
    // Редюсер для видалення марки з колекції (використовується після успішного API-запиту)
    removeCollectedStamp: (state, action) => {
      state.collectedStamps = state.collectedStamps.filter(
        (id) => id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollectedStamps.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCollectedStamps.fulfilled, (state, action) => {
        state.isLoading = false;
        state.collectedStamps = action.payload.map((stamp) => stamp._id);
      })
      .addCase(fetchCollectedStamps.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { addCollectedStamp, removeCollectedStamp } = userSlice.actions;

export default userSlice.reducer;
