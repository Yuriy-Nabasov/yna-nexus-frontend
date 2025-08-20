// src/pages/StampDetailsPage/StampDetailsPage.jsx

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStampById } from "../../redux/stamps/stampsSlice";
import {
  addCollectedStamp,
  removeCollectedStamp,
  addDesiredStamp,
  removeDesiredStamp,
  addExchangeStamp,
  removeExchangeStamp,
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

  // Отримуємо колекції та статус авторизації користувача
  const collectedStamps = useSelector(
    (state) => state.auth.user?.collectedStamps
  );
  const desiredStamps = useSelector((state) => state.auth.user?.desiredStamps);
  const exchangeStamps = useSelector(
    (state) => state.auth.user?.exchangeStamps
  );
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // Стан для відстеження завантаження для кожної групи кнопок
  const [isProcessingCollected, setIsProcessingCollected] = useState(false);
  const [isProcessingDesired, setIsProcessingDesired] = useState(false);
  const [isProcessingExchange, setIsProcessingExchange] = useState(false);

  // При першому рендері завантажуємо лише інформацію про марку
  useEffect(() => {
    if (stampId) {
      dispatch(fetchStampById(stampId));
    }
  }, [dispatch, stampId]);

  const handleGoBack = () => {
    navigate(-1);
  };

  // Функції для колекції
  const handleAddCollectedStamp = async () => {
    if (!isLoggedIn || isProcessingCollected) return;
    setIsProcessingCollected(true);
    try {
      await dispatch(addCollectedStamp(stampId)).unwrap();
    } catch (err) {
      console.error("Failed to add stamp to collected:", err);
    } finally {
      setIsProcessingCollected(false);
    }
  };

  const handleRemoveCollectedStamp = async () => {
    if (!isLoggedIn || isProcessingCollected) return;
    setIsProcessingCollected(true);
    try {
      await dispatch(removeCollectedStamp(stampId)).unwrap();
    } catch (err) {
      console.error("Failed to remove stamp from collected:", err);
    } finally {
      setIsProcessingCollected(false);
    }
  };

  // Функції для бажаної колекції
  const handleAddDesiredStamp = async () => {
    if (!isLoggedIn || isProcessingDesired) return;
    setIsProcessingDesired(true);
    try {
      await dispatch(addDesiredStamp(stampId)).unwrap();
    } catch (err) {
      console.error("Failed to add stamp to desired:", err);
    } finally {
      setIsProcessingDesired(false);
    }
  };

  const handleRemoveDesiredStamp = async () => {
    if (!isLoggedIn || isProcessingDesired) return;
    setIsProcessingDesired(true);
    try {
      await dispatch(removeDesiredStamp(stampId)).unwrap();
    } catch (err) {
      console.error("Failed to remove stamp from desired:", err);
    } finally {
      setIsProcessingDesired(false);
    }
  };

  // Функції для обміну
  const handleAddExchangeStamp = async () => {
    if (!isLoggedIn || isProcessingExchange) return;
    setIsProcessingExchange(true);
    try {
      await dispatch(addExchangeStamp(stampId)).unwrap();
    } catch (err) {
      console.error("Failed to add stamp to exchange:", err);
    } finally {
      setIsProcessingExchange(false);
    }
  };

  const handleRemoveExchangeStamp = async () => {
    if (!isLoggedIn || isProcessingExchange) return;
    setIsProcessingExchange(true);
    try {
      await dispatch(removeExchangeStamp(stampId)).unwrap();
    } catch (err) {
      console.error("Failed to remove stamp from exchange:", err);
    } finally {
      setIsProcessingExchange(false);
    }
  };

  const isStampInCollected = collectedStamps?.includes(stampId);
  const isStampInDesired = desiredStamps?.includes(stampId);
  const isStampInExchange = exchangeStamps?.includes(stampId);

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
            {!isLoggedIn && (
              <p className={css.loginPrompt}>
                Будь ласка, увійдіть, щоб керувати своєю колекцією.
              </p>
            )}

            {isLoggedIn && (
              <>
                {/* Кнопки для Колекції */}
                {isStampInCollected ? (
                  <button
                    onClick={handleRemoveCollectedStamp}
                    className={`${css.actionButton} ${css.removeButton}`}
                    disabled={isProcessingCollected}
                  >
                    {isProcessingCollected
                      ? "Видалення..."
                      : "Видалити з колекції"}
                  </button>
                ) : (
                  <button
                    onClick={handleAddCollectedStamp}
                    className={`${css.actionButton} ${css.addButton}`}
                    disabled={isProcessingCollected}
                  >
                    {isProcessingCollected
                      ? "Додавання..."
                      : "Додати до колекції"}
                  </button>
                )}

                {/* Кнопки для Бажаних марок */}
                {isStampInDesired ? (
                  <button
                    onClick={handleRemoveDesiredStamp}
                    className={`${css.actionButton} ${css.removeButton}`}
                    disabled={isProcessingDesired}
                  >
                    {isProcessingDesired
                      ? "Видалення..."
                      : "Видалити з бажаних"}
                  </button>
                ) : (
                  <button
                    onClick={handleAddDesiredStamp}
                    className={`${css.actionButton} ${css.addButton}`}
                    disabled={isProcessingDesired}
                  >
                    {isProcessingDesired ? "Додавання..." : "Додати до бажаних"}
                  </button>
                )}

                {/* Кнопки для Обміну */}
                {isStampInExchange ? (
                  <button
                    onClick={handleRemoveExchangeStamp}
                    className={`${css.actionButton} ${css.removeButton}`}
                    disabled={isProcessingExchange}
                  >
                    {isProcessingExchange
                      ? "Видалення..."
                      : "Видалити з обміну"}
                  </button>
                ) : (
                  <button
                    onClick={handleAddExchangeStamp}
                    className={`${css.actionButton} ${css.addButton}`}
                    disabled={isProcessingExchange}
                  >
                    {isProcessingExchange ? "Додавання..." : "Додати до обміну"}
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StampDetailsPage;
