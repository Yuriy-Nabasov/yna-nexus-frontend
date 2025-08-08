import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import CatalogPage from "./pages/CatalogPage/CatalogPage";
import { lazy } from "react";

// Заглушки для інших сторінок
const CollectedStampsPage = () => <div>Моя колекція</div>;
const DesiredStampsPage = () => <div>Бажані марки</div>;
const ExchangeStampsPage = () => <div>Марки на обмін</div>;
const NotFoundPage = lazy(() =>
  import("./pages/NotFoundPage/NotFoundPage.jsx")
);

function App() {
  return (
    <Router>
      <Header />
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/collected" element={<CollectedStampsPage />} />
          <Route path="/desired" element={<DesiredStampsPage />} />
          <Route path="/exchange" element={<ExchangeStampsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
