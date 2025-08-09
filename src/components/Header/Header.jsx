import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/auth/authSlice";
import css from "./Header.module.css";

const Header = () => {
  const dispatch = useDispatch();
  const { user, isLoggedIn } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };
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
      <div className={css.authSection}>
        {isLoggedIn ? (
          <>
            <span className={css.greeting}>Привіт, {user?.name}!</span>
            <button onClick={handleLogout} className={css.logoutButton}>
              Вихід
            </button>
          </>
        ) : (
          <>
            <Link to="/register" className={css.authButton}>
              Реєстрація
            </Link>
            <Link to="/login" className={css.authButton}>
              Вхід
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
