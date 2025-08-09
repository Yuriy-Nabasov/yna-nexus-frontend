// src/redux/user/userOperations.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCollectedStamps = createAsyncThunk(
  "user/fetchCollectedStamps",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://yna-nexus-api.onrender.com/users/me/collected-stamps`
      );
      return response.data.data.collectedStamps;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const addCollectedStamp = createAsyncThunk(
  "user/addCollectedStamp",
  async (stampId, { rejectWithValue }) => {
    try {
      await axios.post(
        `https://yna-nexus-api.onrender.com/users/me/collected-stamps/${stampId}`
      );
      return { stampId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const removeCollectedStamp = createAsyncThunk(
  "user/removeCollectedStamp",
  async (stampId, { rejectWithValue }) => {
    try {
      await axios.delete(
        `https://yna-nexus-api.onrender.com/users/me/collected-stamps/${stampId}`
      );
      return { stampId };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
