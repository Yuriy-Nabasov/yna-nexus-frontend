// src/App.jsx

import { useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { refreshUser } from "./redux/auth/authOperations";

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
const RegisterPage = lazy(() => import("./pages/RegisterPage/RegisterPage"));
const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const DesiredStampsPage = lazy(() =>
  import("./pages/DesiredStampsPage/DesiredStampsPage")
);
const ExchangeStampsPage = lazy(() =>
  import("./pages/ExchangeStampsPage/ExchangeStampsPage")
);
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

function App() {
  const dispatch = useDispatch();
  const { token, isRefreshing } = useSelector((state) => state.auth);

  useEffect(() => {
    // Перевіряємо наявність токена перед викликом refreshUser
    if (token) {
      dispatch(refreshUser());
    }
  }, [dispatch, token]);

  return (
    <PersistGate loading={<Loader />} persistor={persistor}>
      <Router>
        <Header />
        <div className="content-wrapper">
          <Suspense fallback={<Loader />}>
            {isRefreshing ? (
              <Loader />
            ) : (
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/catalog" element={<CatalogPage />} />
                <Route path="/stamps/:stampId" element={<StampDetailsPage />} />
                <Route path="/collected" element={<CollectedStampsPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/desired" element={<DesiredStampsPage />} />
                <Route path="/exchange" element={<ExchangeStampsPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            )}
          </Suspense>
        </div>
      </Router>
    </PersistGate>
  );
}

export default App;
