// src/redux/stamps/stampsSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://yna-nexus-api.onrender.com/stamps";

const initialState = {
  items: [],
  page: 1,
  totalPages: 1,
  isLoading: false,
  error: null,
};

export const fetchAllStamps = createAsyncThunk(
  "stamps/fetchAllStamps",
  async (options, thunkAPI) => {
    try {
      const {
        page,
        perPage = 12,
        sortBy = "createdAt",
        sortOrder = "desc",
      } = options;

      const response = await axios.get(BASE_URL, {
        params: { page, perPage, sortBy, sortOrder },
      });

      return {
        items: response.data.data.data,
        pagination: response.data.data,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const stampsSlice = createSlice({
  name: "stamps",
  initialState,
  reducers: {
    setPage(state, action) {
      state.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllStamps.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllStamps.fulfilled, (state, action) => {
        state.isLoading = false;

        const { items, pagination } = action.payload;

        if (pagination) {
          state.items = items;
          state.page = pagination.page;
          state.totalPages = pagination.totalPages;
        } else {
          state.items = items;
          state.page = 1;
          state.totalPages = 1;
        }
      })
      .addCase(fetchAllStamps.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setPage } = stampsSlice.actions;
export const stampsReducer = stampsSlice.reducer;
