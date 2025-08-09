// src/pages/RegisterPage/RegisterPage.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../redux/auth/authOperations";
import css from "./RegisterPage.module.css";

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register({ name, email, password }))
      .unwrap()
      .then(() => {
        navigate("/catalog");
      })
      .catch((error) => {
        console.error("Помилка реєстрації:", error);
        // За бажанням, тут можна додати логіку для виведення повідомлення користувачу
      });
  };

  return (
    <div className={css.container}>
      <h1 className={css.title}>Реєстрація</h1>
      <form className={css.form} onSubmit={handleSubmit}>
        <label className={css.label}>
          Ім'я:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={css.input}
            autoComplete="name"
            required
          />
        </label>
        <label className={css.label}>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={css.input}
            autoComplete="email"
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
            autoComplete="new-password"
            required
          />
        </label>
        <button type="submit" className={css.button}>
          Зареєструватися
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
