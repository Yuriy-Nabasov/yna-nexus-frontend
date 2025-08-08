import { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFilters } from "../../redux/stamps/stampsSlice";
import css from "./FilterComponent.module.css";

const FilterComponent = () => {
  const dispatch = useDispatch();
  const reduxFilters = useSelector((state) => state.stamps.filters);

  const [filters, setFiltersLocal] = useState(reduxFilters);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Синхронізуємо локальний стан з Redux, якщо він змінився
  useEffect(() => {
    setFiltersLocal(reduxFilters);
  }, [reduxFilters]);

  const handleChange = (name, value) => {
    setFiltersLocal((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    if (name === "year") {
      setIsDropdownOpen(false);
    }
  };

  const handleApplyFilters = () => {
    // Відправляємо оновлені фільтри в Redux
    dispatch(setFilters(filters));
  };

  const handleResetFilters = () => {
    // Скидаємо фільтри і в локальному стані, і в Redux
    setFiltersLocal({ topic: "", year: "" });
    dispatch(setFilters({ topic: "", year: "" }));
  };

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const startYear = 1992;
    const yearsArray = [];
    for (let year = currentYear; year >= startYear; year--) {
      yearsArray.push(year);
    }
    return yearsArray;
  }, []);

  return (
    <div className={css.filterContainer}>
      <div className={css.filterField}>
        <label htmlFor="topic">Тематика:</label>
        <input
          id="topic"
          name="topic"
          type="text"
          value={filters.topic}
          onChange={(e) => handleChange("topic", e.target.value)}
          placeholder="Спорт"
        />
      </div>
      <div className={css.filterField}>
        <label htmlFor="year-select">Рік:</label>
        <div className={css.customSelect}>
          <div
            className={css.selectedOption}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            {filters.year || "Усі роки"}
          </div>
          {isDropdownOpen && (
            <ul className={css.dropdownList}>
              <li onClick={() => handleChange("year", "")}>Усі роки</li>
              {years.map((year) => (
                <li key={year} onClick={() => handleChange("year", year)}>
                  {year}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className={css.buttonContainer}>
        <button className={css.applyButton} onClick={handleApplyFilters}>
          Застосувати
        </button>
        <button className={css.resetButton} onClick={handleResetFilters}>
          Скинути
        </button>
      </div>
    </div>
  );
};

export default FilterComponent;
