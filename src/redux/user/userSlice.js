// src/redux/user/userSlice.js

import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCollectedStamps,
  addCollectedStamp,
  removeCollectedStamp,
} from "./userOperations";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollectedStamps.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCollectedStamps.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchCollectedStamps.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(addCollectedStamp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCollectedStamp.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addCollectedStamp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(removeCollectedStamp.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeCollectedStamp.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(removeCollectedStamp.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
