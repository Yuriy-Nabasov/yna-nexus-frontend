// src/pages/StampDetailsPage/StampDetailsPage.jsx

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStampById } from "../../redux/stamps/stampsSlice";
import {
  addCollectedStamp,
  removeCollectedStamp,
} from "../../redux/user/userOperations";
import stampPlaceholder from "../../assets/images/stamp-placeholder.webp";
import css from "./StampDetailsPage.module.css";

const StampDetailsPage = () => {
  const { stampId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Отримуємо дані зі стану Redux
  const stamp = useSelector((state) => state.stamps.currentItem);
  const isLoading = useSelector((state) => state.stamps.isLoading);
  const error = useSelector((state) => state.stamps.error);
  // Колекція та статус авторизації користувача
  const collectedStamps = useSelector((state) => state.user.collectedStamps);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [isProcessing, setIsProcessing] = useState(false);

  // При першому рендері завантажуємо лише інформацію про марку
  useEffect(() => {
    if (stampId) {
      dispatch(fetchStampById(stampId));
    }
  }, [dispatch, stampId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  // Функція для додавання марки до колекції
  const handleAddStamp = async () => {
    if (!isLoggedIn) return; // Захист від неавторизованих користувачів
    setIsProcessing(true);
    await dispatch(addCollectedStamp(stampId));
    setIsProcessing(false);
  };

  const handleRemoveStamp = async () => {
    if (!isLoggedIn) return;
    setIsProcessing(true);
    await dispatch(removeCollectedStamp(stampId));
    setIsProcessing(false);
  };

  const isStampInCollection = collectedStamps.includes(stampId);

  if (isLoading) {
    return <div className={css.loading}>Завантаження...</div>;
  }

  if (error) {
    return <div className={css.error}>Помилка: {error}</div>;
  }

  if (!stamp) {
    return <div className={css.notFound}>Марка не знайдена.</div>;
  }

  const imageSrc = stamp.picture || stampPlaceholder;

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
          src={imageSrc}
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
          <div className={css.actionButtons}>
            {isLoggedIn ? (
              isStampInCollection ? (
                <button
                  onClick={handleRemoveStamp}
                  className={`${css.actionButton} ${css.removeButton}`}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Видалення..." : "Видалити з колекції"}
                </button>
              ) : (
                <button
                  onClick={handleAddStamp}
                  className={`${css.actionButton} ${css.addButton}`}
                  disabled={isProcessing}
                >
                  {isProcessing ? "Додавання..." : "Додати до колекції"}
                </button>
              )
            ) : (
              <p className={css.loginPrompt}>
                Будь ласка, увійдіть, щоб керувати своєю колекцією.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StampDetailsPage;
