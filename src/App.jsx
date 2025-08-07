// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import CatalogPage from "./pages/CatalogPage/CatalogPage";
import css from "./App.module.css";

// Заглушки для інших сторінок
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

        <div className={css.contentContainer}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/collected" element={<CollectedStampsPage />} />
            <Route path="/desired" element={<DesiredStampsPage />} />
            <Route path="/exchange" element={<ExchangeStampsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
