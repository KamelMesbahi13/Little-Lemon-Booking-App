import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCategories,
  setProducts,
  setChecked,
} from "../../Redux/Features/Shop/shopSlice";
import { useGetFilteredProductsQuery } from "../../Redux/Api/productApiSlice";
import { useFetchCategoriesQuery } from "../../Redux/Api/categoryApiSlice";
import Loader from "../Ui/Loader/Loader";
import ProductCard from "../Products/ProductsCard/ProductsCard";
import { useTranslation } from "react-i18next";

const Shop = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );

  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
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
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => {
            const priceMatch =
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10);
            const nameMatch = product.name
              .toLowerCase()
              .includes(nameFilter.toLowerCase());
            return priceMatch && nameMatch;
          }
        );

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

  const handleBrandClick = (brand) => {
    const productsByBrand = filteredProductsQuery.data?.filter(
      (product) => product.brand === brand
    );
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };

  const handleNameChange = (e) => {
    setNameFilter(e.target.value);
  };

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
      <div className="flex flex-col gap-6 md:flex-row">
        <div className="w-full p-6 bg-[#eee] rounded-lg shadow-lg md:w-1/4">
          <h6 className="py-2 my-6 text-base text-center rounded-full shadow text-mainColor">
            {t("filter_by_name")}
          </h6>
          <input
            type="text"
            placeholder={t("enter_product_name")}
            value={nameFilter}
            onChange={handleNameChange}
            className="w-full p-3 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <h6 className="py-2 my-6 text-base text-center rounded-full shadow text-mainColor">
            {t("filter_by_categories")}
          </h6>
          <div className="my-6">
            {categories?.map((c) => (
              <label key={c._id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  onChange={(e) => handleCheck(e.target.checked, c._id)}
                  className="w-4 h-4 mr-2 text-blue-600 border-gray-300 rounded focus:ring-blue-600"
                />
                <span className="text-sm text-gray-700">{c.name}</span>
              </label>
            ))}
          </div>

          <h6 className="py-2 my-6 text-base text-center rounded-full shadow text-mainColor">
            {t("filter_by_brands")}
          </h6>
          <div>
            {uniqueBrands?.map((brand) => (
              <label key={brand} className="flex items-center mb-2">
                <input
                  type="radio"
                  name="brand"
                  onChange={() => handleBrandClick(brand)}
                  className="w-4 h-4 mr-2 text-blue-600 border-gray-300 rounded focus:ring-blue-600"
                />
                <span className="text-sm text-gray-700">{brand}</span>
              </label>
            ))}
          </div>

          <h6 className="py-2 my-6 text-base text-center rounded-full shadow text-mainColor">
            {t("filter_by_price")}
          </h6>
          <input
            type="text"
            placeholder={t("enter_price")}
            value={priceFilter}
            onChange={handlePriceChange}
            className="w-full p-3 mb-6 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <button
            className="button"
            onClick={() => {
              setPriceFilter("");
              setNameFilter("");
              window.location.reload();
            }}
          >
            {t("clear")}
          </button>
        </div>

        <div className="flex-1">
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

export default Shop;
