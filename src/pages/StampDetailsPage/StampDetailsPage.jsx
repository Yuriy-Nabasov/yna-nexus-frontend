// src/pages/StampDetailsPage/StampDetailsPage.jsx

import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStampById } from "../../redux/stamps/stampsSlice";
import css from "./StampDetailsPage.module.css";

const StampDetailsPage = () => {
  const { stampId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stamp = useSelector((state) => state.stamps.currentItem);
  const isLoading = useSelector((state) => state.stamps.isLoading);
  const error = useSelector((state) => state.stamps.error);

  useEffect(() => {
    if (stampId) {
      dispatch(fetchStampById(stampId));
    }
  }, [dispatch, stampId]);

  const handleGoBack = () => {
    navigate(-1); // Повертаємося на попередню сторінку
  };

  if (isLoading) {
    return <div className={css.loading}>Завантаження...</div>;
  }

  if (error) {
    return <div className={css.error}>Помилка: {error}</div>;
  }

  if (!stamp) {
    return <div className={css.notFound}>Марка не знайдена.</div>;
  }

  return (
    <div className={css.container}>
      <div className={css.backButtonWrapper}>
        <button onClick={handleGoBack} className={css.backButton}>
          &larr; Повернутися
        </button>
      </div>
      <h1 className={css.title}>Марка № {stamp["ukrposhta-number"]}</h1>
      <div className={css.detailsGrid}>
        <img
          src={stamp.picture}
          alt={`Марка № ${stamp["ukrposhta-number"]}`}
          className={css.stampImage}
        />
        <div className={css.info}>
          <p>
            <strong>Тематика:</strong> {stamp.topic || "Не вказано"}
          </p>
          <p>
            <strong>Країна:</strong> {stamp.country}
          </p>

          <p>
            <strong>Рік випуску:</strong> {stamp.year}
          </p>

          <p>
            <strong>Номінал: </strong>
            {stamp.denomination || "Не вказано"}
          </p>

          <p>
            <strong>Дата випуску: </strong>
            {new Date(stamp.startDate).toLocaleDateString() || "Не вказано"}
          </p>

          <p>
            <strong>Тираж: </strong>
            {stamp.circulation || "Не вказано"}
          </p>

          <p>
            <strong>Дизайнер: </strong>
            {stamp.design || "Не вказано"}
          </p>

          <p>
            <strong>Входить у блок: </strong>
            {stamp.blok ? "Так" : "Ні"}
          </p>

          <p>
            <strong>Ціна:</strong> {stamp.price || "Не вказано"} грн.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StampDetailsPage;
