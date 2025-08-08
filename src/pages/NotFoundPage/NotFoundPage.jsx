// src/pages/NotFoundPage/NotFoundPage.jsx
import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={css.notFoundContainer}>
      <h1 className={css.title}>404 - Page Not Found</h1>
      <p className={css.message}>На жаль, сторінку не знайдено.</p>
      <Link to="/" className={css.homeLink}>
        Повернутися на головну
      </Link>
    </div>
  );
};

export default NotFoundPage;
