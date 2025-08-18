// src/redux/user/userSlice.js

import { createSlice } from "@reduxjs/toolkit";
// import { fetchCollectedStamps } from "./userOperations";
import {
  fetchCollectedStamps,
  addCollectedStamp,
  removeCollectedStamp,
} from "./userOperations";

const userSlice = createSlice({
  name: "user",
  initialState: {
    collectedStamps: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    // Ці редюсери більше не потрібні, оскільки ми обробляємо
    // асинхронні операції в extraReducers
    // Редюсер для додавання марки до колекції (використовується після успішного API-запиту)
    // addCollectedStamp: (state, action) => {
    //   if (!state.collectedStamps.includes(action.payload)) {
    //     state.collectedStamps.push(action.payload);
    //   }
    // },
    // Редюсер для видалення марки з колекції (використовується після успішного API-запиту)
    // removeCollectedStamp: (state, action) => {
    //   state.collectedStamps = state.collectedStamps.filter(
    //     (id) => id !== action.payload
    //   );
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCollectedStamps.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCollectedStamps.fulfilled, (state, action) => {
        state.isLoading = false;
        // Переконуємося, що ми отримуємо масив ID
        // Якщо бекенд повертає повні об'єкти, ми беремо тільки їх ID
        state.collectedStamps = action.payload.map((stamp) => stamp._id);
      })
      .addCase(fetchCollectedStamps.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Обробка додавання марки (success)
      .addCase(addCollectedStamp.fulfilled, (state, action) => {
        const { stampId } = action.payload;
        // Додаємо ID марки до масиву, якщо його там ще немає
        if (!state.collectedStamps.includes(stampId)) {
          state.collectedStamps.push(stampId);
        }
      })
      // Обробка видалення марки (success)
      .addCase(removeCollectedStamp.fulfilled, (state, action) => {
        const { stampId } = action.payload;
        // Фільтруємо масив, щоб видалити ID марки
        state.collectedStamps = state.collectedStamps.filter(
          (id) => id !== stampId
        );
      })
      // Додаємо обробку помилок для всіх асинхронних операцій
      .addCase(addCollectedStamp.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeCollectedStamp.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

// Синхронні екшени більше не експортуються,
// тому що ми не використовуємо їх у компоненті напряму
// export const { addCollectedStamp, removeCollectedStamp } = userSlice.actions;

export default userSlice.reducer;
