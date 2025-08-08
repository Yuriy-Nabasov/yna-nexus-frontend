// src/redux/stamps/stampsSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://yna-nexus-api.onrender.com/stamps";

const initialState = {
  items: [],
  page: 1,
  totalPages: 1,
  filters: {
    topic: "",
    year: "",
  },
  isLoading: false,
  error: null,
};

export const fetchAllStamps = createAsyncThunk(
  "stamps/fetchAllStamps",
  async (options, thunkAPI) => {
    try {
      const {
        page = 1,
        perPage = 12,
        sortBy = "createdAt",
        sortOrder = "desc",
        filters,
      } = options;

      const params = {
        page,
        perPage,
        sortBy,
        sortOrder,
        ...filters,
      };

      const response = await axios.get(BASE_URL, { params });

      return {
        items: response.data.data.data,
        pagination: response.data.data,
        filters,
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
    setFilters(state, action) {
      state.filters = action.payload;
      state.page = 1;
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

        const { items, pagination, filters } = action.payload;

        if (pagination) {
          state.items = items;
          state.page = pagination.page;
          state.totalPages = pagination.totalPages;
          state.filters = filters;
        } else {
          state.items = items;
          state.page = 1;
          state.totalPages = 1;
          state.filters = filters;
        }
      })
      .addCase(fetchAllStamps.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setPage, setFilters } = stampsSlice.actions;
export const stampsReducer = stampsSlice.reducer;
