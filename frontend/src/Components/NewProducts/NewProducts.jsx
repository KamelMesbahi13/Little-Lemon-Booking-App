import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../Redux/Features/Shop/shopSlice";
import { useGetNewProductsQuery } from "../../Redux/Api/productApiSlice";
import Loader from "../Ui/Loader/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const NewProducts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products } = useSelector((state) => state.shop);
  const { t } = useTranslation();

  const handleLinkClick = (route) => {
    navigate(route);
    window.scrollTo(0, 0);
  };

  const newProductsQuery = useGetNewProductsQuery();

  useEffect(() => {
    if (newProductsQuery.data) {
      dispatch(setProducts(newProductsQuery.data));
    }
  }, [newProductsQuery.data, dispatch]);

  return (
    <div className="flex w-full py-4 mt-10 overflow-hidden TextureBack md:mt-20">
      <div className="container px-4 mx-auto">
        <div className="mb-8 text-center">
          <Link
            className="duration-300 hover:text-mainColor"
            to="/Nouveau-produit"
          >
            <h2>{t("latest_products")}ee</h2>
          </Link>
        </div>
        <div className="flex overflow-hidden">
          {newProductsQuery.isLoading ? (
            <Loader />
          ) : products.length === 0 ? (
            <p className="text-center text-gray-600">
              No new products available.
            </p>
          ) : (
            products.slice(-3).map((product) => (
              <div
                key={product._id}
                className="box flex-shrink-0 mx-2 md:mx-8 w-[50%] p-2 sm:w-[30%] md:w-[30%] lg:w-[15%]"
              >
                <div className="flex flex-col h-full transition-shadow duration-300 ease-in-out border border-[#eee] rounded-lg shadow-lg hover:shadow-xl animate-slide">
                  <Link
                    className="text-center"
                    to={`/Produit/${product._id}`}
                    onClick={handleLinkClick}
                  >
                    <img
                      className="w-full h-32 rounded-t-md"
                      src={product.image_one}
                      alt={product.name}
                    />
                  </Link>
                  <div className="flex-grow p-4">
                    <div className="mt-4">
                      <p className="mt-2 text-lg">{product.name}</p>
                      <p className="font-bold text-mainColor">
                        {product.price} DZD
                      </p>
                    </div>
                    <Link
                      to={`/Produit/${product._id}`}
                      onClick={handleLinkClick}
                      className="inline-flex items-center px-3 py-2 mt-4 bg-[#065dd8] text-white rounded-md hover:bg-[#0a6bff] focus:ring-2 focus:outline-none focus:ring-blue-300 transition-colors duration-200 ease-in-out text-sm"
                    >
                      {t("read_more")}
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NewProducts;
