import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Loader from "../../Ui/Loader/Loader";
import { useFetchCategoriesQuery } from "../../../Redux/Api/categoryApiSlice";
import { useGetFilteredProductsQuery } from "../../../Redux/Api/productApiSlice";
import {
  setCategories,
  setProducts,
} from "../../../Redux/Features/Shop/shopSlice";
import ProductCard from "../ProductsCard/ProductsCard";

const NewestProducts = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { products, checked, radio } = useSelector((state) => state.shop);

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter] = useState("");
  const [nameFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading) {
        const filteredProducts = filteredProductsQuery.data
          .filter((product) => {
            const priceMatch =
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10);
            const nameMatch = product.name
              .toLowerCase()
              .includes(nameFilter.toLowerCase());
            return priceMatch && nameMatch;
          })
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by newest
          .slice(0, 30); // Limit to 30 newest products

        dispatch(setProducts(filteredProducts));
      }
    }
  }, [
    checked,
    radio,
    filteredProductsQuery.data,
    dispatch,
    priceFilter,
    nameFilter,
  ]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(products.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <div className="container px-4 mx-auto mt-12 md:mt-20">
      <div className="textCenter">
        <h1> {t("latest_products")}</h1>
      </div>
      <div>
        <div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
            {products.length === 0 ? (
              <Loader />
            ) : (
              currentProducts.map((p) => (
                <ProductCard
                  key={p._id}
                  p={p}
                  className="p-4 rounded-lg shadow-lg bg-mainColor"
                />
              ))
            )}
          </div>

          <div className="flex justify-center my-10">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 mx-1 rounded-md transition-colors ${
                  currentPage === index + 1
                    ? "bg-mainColor text-white"
                    : "bg-mainColor text-white hover:bg-secondColor"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewestProducts;
