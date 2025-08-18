// src/redux/store.js

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { stampsReducer } from "./stamps/stampsSlice";
import { authReducer } from "./auth/authSlice";
import userReducer from "./user/userSlice";

// Додаємо імпорт authService, щоб ми могли викликати setAuthToken
import { authService } from "../services/authApi";
// Додаємо listenerMiddleware для обробки подій Redux
import { createListenerMiddleware } from "@reduxjs/toolkit";

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["stamps", "auth", "user"],
// };

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"], // Зберігаємо лише токен
};

// Об'єднуємо всі наші редуктори в один кореневий
// Використовуємо combineReducers, щоб створити єдиний редуктор
const rootReducer = combineReducers({
  stamps: stampsReducer,
  // auth: authReducer,
  auth: persistReducer(authPersistConfig, authReducer), // Застосовуємо persistReducer лише до auth
  user: userReducer,
});

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// Створюємо listenerMiddleware
const listenerMiddleware = createListenerMiddleware();

// Додаємо слухача, який спрацює, коли Redux Persist завантажить дані
listenerMiddleware.startListening({
  actionCreator: PERSIST,
  effect: (action, listenerApi) => {
    // Отримуємо поточний стан
    const { auth } = listenerApi.getState();
    const token = auth.token;
    // Встановлюємо токен для всіх axios-запитів, якщо він існує
    if (token) {
      authService.setAuthToken(token);
    }
  },
});

// Налаштовуємо Redux-стор
export const store = configureStore({
  // reducer: persistedReducer,
  reducer: rootReducer, // Використовуємо об'єднаний редуктор
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).prepend(listenerMiddleware.middleware),
});

export const persistor = persistStore(store);
