// src/services/axiosInstance.js

import axios from "axios";
import { store } from "../redux/store";

axios.interceptors.request.use(
  (config) => {
    // Встановлюємо опцію withCredentials для надсилання кукі з крос-доменними запитами
    config.withCredentials = true;
    // Отримуємо поточний стан з Redux store
    const state = store.getState();
    const token = state.auth.token;

    // Якщо токен існує, очищаємо його і додаємо до заголовка Authorization
    if (token) {
      // Видаляємо зайві лапки
      const cleanToken = token.replace(/^"(.*)"$/, "$1");
      config.headers.Authorization = `Bearer ${cleanToken}`;
    }

    // Повертаємо оновлену конфігурацію
    return config;
  },
  (error) => {
    // Обробка помилок запиту
    return Promise.reject(error);
  }
);

// Експортуємо налаштований екземпляр axios.
// Тепер всі файли, що імпортують axios, будуть використовувати цей екземпляр.
export default axios;
