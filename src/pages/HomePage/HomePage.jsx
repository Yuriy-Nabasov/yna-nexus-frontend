// src/pages/HomePage/HomePage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import css from "./HomePage.module.css";

const HomePage = () => {
  const navigate = useNavigate();

  const handleViewCatalog = () => {
    navigate("/catalog");
  };

  return (
    <div className={css.homePageContainer}>
      <div className={css.bannerContent}>
        <h1 className={css.mainTitle}>Your Nexus Archive</h1>
        <p className={css.description}>
          Організуйте та каталогізуйте свою колекцію марок як ніколи раніше.
          Почніть свою подорож у світ упорядкованих колекцій вже сьогодні!
        </p>
        <button className={css.catalogButton} onClick={handleViewCatalog}>
          Переглянути каталог
        </button>
      </div>
    </div>
  );
};

export default HomePage;
