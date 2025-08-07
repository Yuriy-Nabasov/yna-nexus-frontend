// src/components/StampCard/StampCard.jsx

import css from "./StampCard.module.css";
import stampPlaceholder from "../../assets/images/stamp-placeholder.webp";

const StampCard = ({ stamp }) => {
  const imageSrc = stamp.picture || stampPlaceholder;

  return (
    <div className={css.card}>
      <div className={css.imageContainer}>
        <img
          src={imageSrc}
          alt={stamp.description || "Марка"}
          className={css.image}
        />
      </div>
      <div className={css.content}>
        <p className={css.year}>{stamp.year}</p>
        <p className={css.description}>{stamp.description}</p>
      </div>
    </div>
  );
};

export default StampCard;
