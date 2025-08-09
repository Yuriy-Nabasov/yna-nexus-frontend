// src/pages/LoginPage/LoginPage.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/auth/authSlice";
import css from "./LoginPage.module.css";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }))
      .unwrap()
      .then(() => {
        // Перенаправлення після успішного входу
        navigate("/catalog");
      })
      .catch((error) => {
        // Обробка помилок входу
        console.error("Помилка входу:", error);
        alert(`Помилка входу: ${error}`);
      });
  };

  return (
    <div className={css.container}>
      <h1 className={css.title}>Вхід</h1>
      <form className={css.form} onSubmit={handleSubmit}>
        <label className={css.label}>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={css.input}
            required
          />
        </label>
        <label className={css.label}>
          Пароль:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={css.input}
            autoComplete="current-password"
            required
          />
        </label>
        <button type="submit" className={css.button}>
          Увійти
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
