// src/pages/CatalogPage/CatalogPage.jsx

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllStamps, setPage } from "../../redux/stamps/stampsSlice";
import StampCard from "../../components/StampCard/StampCard";
import FilterComponent from "../../components/FilterComponent/FilterComponent";
import { BeatLoader } from "react-spinners";
import css from "./CatalogPage.module.css";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const stamps = useSelector((state) => state.stamps.items);
  const page = useSelector((state) => state.stamps.page);
  const totalPages = useSelector((state) => state.stamps.totalPages);
  const isLoading = useSelector((state) => state.stamps.isLoading);
  const error = useSelector((state) => state.stamps.error);
  const filters = useSelector((state) => state.stamps.filters);

  useEffect(() => {
    dispatch(fetchAllStamps({ page, filters }));
  }, [dispatch, page, filters]);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === page) return;
    dispatch(setPage(newPage));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const pageRange = 2;

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            className={`${css.paginationButton} ${
              page === i ? css.active : ""
            }`}
            onClick={() => handlePageChange(i)}
            disabled={page === i}
          >
            {i}
          </button>
        );
      }
      return buttons;
    }

    if (page > pageRange + 1) {
      buttons.push(
        <button
          key={1}
          className={css.paginationButton}
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
      );
      buttons.push(
        <span key="dots-start" className={css.paginationDots}>
          ...
        </span>
      );
    }

    const start = Math.max(1, page - pageRange);
    const end = Math.min(totalPages, page + pageRange);
    for (let i = start; i <= end; i++) {
      buttons.push(
        <button
          key={i}
          className={`${css.paginationButton} ${page === i ? css.active : ""}`}
          onClick={() => handlePageChange(i)}
          disabled={page === i}
        >
          {i}
        </button>
      );
    }

    if (page < totalPages - pageRange) {
      buttons.push(
        <span key="dots-end" className={css.paginationDots}>
          ...
        </span>
      );
    }

    if (page < totalPages - pageRange) {
      buttons.push(
        <button
          key={totalPages}
          className={css.paginationButton}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className={css.catalogPage}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Каталог</h1>
      <FilterComponent />
      {Array.isArray(stamps) && (
        <div className={css.stampsGrid}>
          {stamps.map((stamp) => (
            <StampCard key={stamp._id} stamp={stamp} />
          ))}
        </div>
      )}
      {isLoading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <BeatLoader color="#36d7b7" />
        </div>
      )}
      {error && <p>Помилка: {error}</p>}
      <div className={css.paginationContainer}>
        <button
          className={css.paginationArrow}
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1 || isLoading}
        >
          &lt;
        </button>
        {totalPages > 1 && renderPaginationButtons()}
        <button
          className={css.paginationArrow}
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages || isLoading}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default CatalogPage;
