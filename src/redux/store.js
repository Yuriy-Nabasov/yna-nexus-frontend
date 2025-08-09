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

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["stamps", "auth", "user"],
};

// Об'єднуємо всі наші редуктори в один кореневий
// Використовуємо combineReducers, щоб створити єдиний редуктор
const rootReducer = combineReducers({
  stamps: stampsReducer,
  auth: authReducer,
  user: userReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Налаштовуємо Redux-стор
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
