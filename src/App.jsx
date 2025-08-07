import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header"; // Імпортуємо новий компонент
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
      <Header />
      <div className={css.contentContainer}>
        <Routes>
          <Route path="/" element={<HomePage />} />
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
