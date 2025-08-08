// src/App.jsx

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage/HomePage";
import Loader from "./components/Loader/Loader";

const CatalogPage = lazy(() => import("./pages/CatalogPage/CatalogPage"));
const StampDetailsPage = lazy(() =>
  import("./pages/StampDetailsPage/StampDetailsPage")
);
const CollectedStampsPage = lazy(() =>
  import("./pages/CollectedStampsPage/CollectedStampsPage")
);
const DesiredStampsPage = lazy(() =>
  import("./pages/DesiredStampsPage/DesiredStampsPage")
);
const ExchangeStampsPage = lazy(() =>
  import("./pages/ExchangeStampsPage/ExchangeStampsPage")
);
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

function App() {
  return (
    <Router>
      <Header />
      <div className="content-wrapper">
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/stamps/:stampId" element={<StampDetailsPage />} />
            <Route path="/collected" element={<CollectedStampsPage />} />
            <Route path="/desired" element={<DesiredStampsPage />} />
            <Route path="/exchange" element={<ExchangeStampsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
