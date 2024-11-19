import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useGetProductDetailsQuery } from "../../../Redux/Api/productApiSlice";
import Loader from "../../../Components/Ui/Loader/Loader";
import Message from "../../../Components/Ui/Message/Message";
import { FaBox, FaShoppingCart, FaStar, FaStore } from "react-icons/fa";
import HeartIcon from "../HeartIcon/HeartIcon";
import { addToCart } from "../../../Redux/Features/Cart/cartSlice";
import { useTranslation } from "react-i18next";
import { useGetProductsByCategoryQuery } from "../../../Redux/Api/productApiSlice";
import ProductsDetailsSwiper from "./ProdutDetailsSwiper";

const ProductDetails = () => {
  const { t, i18n } = useTranslation();
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const {
    data: productsByCategory,
    isLoading: loadingCategoryProducts,
    error: categoryError,
  } = useGetProductsByCategoryQuery(product?.category, {
    skip: !product?.category, // Skip fetching if the category is not yet available
  });

  const handleLinkClick = (route) => {
    navigate(route);
    window.scrollTo(0, 0);
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/Livraison");
    window.scrollTo(0, 0);
  };

  // Determine the description based on the current language
  const descriptionToDisplay =
    i18n.language === "ar" ? product?.description_ar : product?.description;

  return (
    <div className="container px-4 py-8 mx-auto">
      <Link
        onClick={handleLinkClick}
        to="/"
        className="block mb-4 text-lg font-semibold text-mainColor hover:underline"
      >
        {t("go_back")}
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <>
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
            <div className="relative flex-1">
              <ProductsDetailsSwiper />
              <HeartIcon product={product} className="absolute top-4 right-4" />
            </div>

            <div className="flex-1 px-4">
              <h2 className="text-lg md:text-2xl text-secondColor">
                {product.name}
              </h2>

              <p className="mt-4 leading-relaxed text-gray-600">
                {descriptionToDisplay}
              </p>

              <h2 className="my-6 text-lg md:text-2xl text-mainColor">
                DZD {product.price}
              </h2>

              <div className="grid grid-cols-1 text-lg md:gap-6 sm:grid-cols-2">
                <div>
                  <div className="flex items-center mb-2">
                    <FaStore className="rtl:ml-2 ltr:mr-2 text-mainColor" />
                    <p>
                      {t("product_list_form_brand")}: {product.brand}
                    </p>
                  </div>
                  <div className="flex items-center mb-2">
                    <FaStar className="rtl:ml-2 ltr:mr-2 text-mainColor" />
                    <p>
                      {t("reviews")}: {product.numReviews}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="flex items-center mb-2">
                    <FaShoppingCart className="rtl:ml-2 ltr:mr-2 text-mainColor" />
                    <p>
                      {t("product_list_form_count_in_stock")}:{" "}
                      {product.countInStock}
                    </p>
                  </div>
                  <div className="flex items-center mb-2">
                    <FaBox className="rtl:ml-2 ltr:mr-2 text-mainColor" />
                    <p>
                      {" "}
                      {t("product_list_form_quantity")}: {product.quantity}
                    </p>
                  </div>
                </div>
              </div>

              {product.countInStock > 0 && (
                <select
                  value={qty}
                  onChange={(e) => setQty(e.target.value)}
                  className="p-2 text-black bg-gray-100 border rounded-lg ltr:mr-4 rtl:ml-4"
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              )}

              <button
                onClick={addToCartHandler}
                disabled={product.countInStock === 0}
                className={`!mt-8 button ${
                  product.countInStock === 0
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {t("add_to_cart")}
              </button>
            </div>
          </div>

          {/* Related Products Section */}
          <div className="my-16">
            <h2 className="mb-6 text-lg text-center md:text-2xl text-secondColor">
              {t("related_products")}
            </h2>

            {loadingCategoryProducts ? (
              <Loader />
            ) : categoryError ? (
              <Message variant="danger">
                {categoryError?.data?.message || categoryError.message}
              </Message>
            ) : (
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                {productsByCategory
                  ?.filter((p) => p._id !== product?._id) // Exclude current product
                  .map((relatedProduct) => {
                    const descriptionToDisplay =
                      i18n.language === "ar"
                        ? relatedProduct.description_ar
                        : relatedProduct.description;

                    return (
                      <div
                        key={relatedProduct._id}
                        className="relative w-full mx-auto transition-transform transform hover:scale-105"
                      >
                        <Link
                          to={`/Produit/${relatedProduct._id}`}
                          onClick={() =>
                            handleLinkClick(`/Produit/${relatedProduct._id}`)
                          }
                          className="block overflow-hidden transition duration-300 ease-in-out rounded-lg shadow-lg hover:shadow-xl"
                          style={{ width: "250px", height: "350px" }}
                        >
                          <img
                            src={relatedProduct.image_one}
                            alt={relatedProduct.name}
                            className="object-cover w-full h-48 transition-transform duration-300 ease-in-out rounded-t-lg group-hover:scale-110"
                          />
                          <div className="flex flex-col justify-between h-32 p-4">
                            <h4 className="text-lg font-semibold truncate text-secondColor">
                              {relatedProduct.name}
                            </h4>
                            <p className="mt-2 font-bold text-mainColor">
                              DZD {relatedProduct.price}
                            </p>
                            <p className="mt-1 text-sm text-gray-500 truncate">
                              {descriptionToDisplay
                                ? descriptionToDisplay.slice(0, 60) + "..."
                                : "No description available."}
                            </p>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
