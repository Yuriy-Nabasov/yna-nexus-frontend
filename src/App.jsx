// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage"; // Імпортуємо HomePage
import css from "./App.module.css"; // Імпортуємо стилі для App

// Заглушки для інших сторінок
const CatalogPage = () => <div className={css.content}>Сторінка каталогу</div>;
const CollectedStampsPage = () => (
  <div className={css.content}>Моя колекція</div>
);
const DesiredStampsPage = () => <div className={css.content}>Бажані марки</div>;
const ExchangeStampsPage = () => (
  <div className={css.content}>Марки на обмін</div>
);

function App() {
  return (
    <Router>
      <div className={css.appContainer}>
        <nav className={css.mainNav}>
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
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />{" "}
          {/* Використовуємо імпортований компонент */}
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/collected" element={<CollectedStampsPage />} />
          <Route path="/desired" element={<DesiredStampsPage />} />
          <Route path="/exchange" element={<ExchangeStampsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
