import { Link } from "react-router-dom";
import css from "./Header.module.css";

const Header = () => {
  return (
    <header className={css.mainNav}>
      <ul className={css.navList}>
        <li>
          <Link to="/" className={css.navLink}>
            Головна
          </Link>
        </li>
        <li>
          <Link to="/catalog" className={css.navLink}>
            Каталог
          </Link>
        </li>
        <li>
          <Link to="/collected" className={css.navLink}>
            Моя колекція
          </Link>
        </li>
        <li>
          <Link to="/desired" className={css.navLink}>
            Бажані
          </Link>
        </li>
        <li>
          <Link to="/exchange" className={css.navLink}>
            Обмін
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
