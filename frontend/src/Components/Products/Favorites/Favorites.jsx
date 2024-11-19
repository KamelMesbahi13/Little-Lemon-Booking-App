import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../../Redux//Features/Favirotes/FaviroteSlice";
import Product from "../Product/Product";
import { useTranslation } from "react-i18next";

const Favorites = () => {
  const { t } = useTranslation();

  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="container">
      <h1 className="my-12">{t("favorite_products")}</h1>
      <div className="flex flex-wrap">
        {favorites.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
