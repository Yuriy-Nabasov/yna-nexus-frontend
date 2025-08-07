import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllStamps } from "../../redux/stamps/stampsSlice";
import StampCard from "../../components/StampCard/StampCard";
import { BeatLoader } from "react-spinners";
import css from "./CatalogPage.module.css";

const CatalogPage = () => {
  const dispatch = useDispatch();

  const stamps = useSelector((state) => state.stamps.items);
  const isLoading = useSelector((state) => state.stamps.isLoading);
  const error = useSelector((state) => state.stamps.error);

  useEffect(() => {
    dispatch(fetchAllStamps());
  }, [dispatch]);

  return (
    <div className={css.catalogPage}>
      {isLoading && <BeatLoader color="#36d7b7" />}
      {error && <p>Помилка: {error}</p>}
      <div className={css.stampsGrid}>
        {Array.isArray(stamps) &&
          stamps.map((stamp) => <StampCard key={stamp._id} stamp={stamp} />)}
      </div>
    </div>
  );
};

export default CatalogPage;
