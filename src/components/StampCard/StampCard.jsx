// src/components/StampCard/StampCard.jsx

import { Link } from "react-router-dom";
import css from "./StampCard.module.css";
import stampPlaceholder from "../../assets/images/stamp-placeholder.webp";

const StampCard = ({ stamp }) => {
  const imageSrc = stamp.picture || stampPlaceholder;

  return (
    <Link to={`/stamps/${stamp._id}`} className={css.cardLink}>
      <div className={css.card}>
        <div className={css.imageContainer}>
          <img
            src={imageSrc}
            alt={stamp.description || `Марка № ${stamp["ukrposhta-number"]}`}
            className={css.image}
          />
        </div>
        <div className={css.content}>
          <p className={css.year}>{stamp.year}</p>
          <p className={css.description}>
            {stamp.description || `Марка № ${stamp["ukrposhta-number"]}`}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default StampCard;
