// import { useState } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { useGetProductDetailsQuery } from "../../../Redux/Api/productApiSlice";
// import Loader from "../../../Components/Ui/Loader/Loader";
// import Message from "../../../Components/Ui/Message/Message";
// import { FaBox, FaShoppingCart, FaStar, FaStore } from "react-icons/fa";
// import HeartIcon from "../HeartIcon/HeartIcon";
// import { addToCart } from "../../../Redux/Features/Cart/cartSlice";
// import { useTranslation } from "react-i18next";
// import { useGetProductsByCategoryQuery } from "../../../Redux/Api/productApiSlice";
// import ProductsDetailsSwiper from "./ProdutDetailsSwiper";

// const ProductDetails = () => {
//   const { t, i18n } = useTranslation();
//   const { id: productId } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [qty, setQty] = useState(1);

//   const {
//     data: product,
//     isLoading,
//     error,
//   } = useGetProductDetailsQuery(productId);

//   const {
//     data: productsByCategory,
//     isLoading: loadingCategoryProducts,
//     error: categoryError,
//   } = useGetProductsByCategoryQuery(product?.category, {
//     skip: !product?.category, // Skip fetching if the category is not yet available
//   });

//   const handleLinkClick = (route) => {
//     navigate(route);
//     window.scrollTo(0, 0);
//   };

//   const addToCartHandler = () => {
//     dispatch(addToCart({ ...product, qty }));
//     navigate("/Livraison");
//     window.scrollTo(0, 0);
//   };

//   // Determine the description based on the current language
//   const descriptionToDisplay =
//     i18n.language === "ar" ? product?.description_ar : product?.description;

//   return (
//     <div className="container px-4 py-8 mx-auto">
//       <Link
//         onClick={handleLinkClick}
//         to="/"
//         className="block mb-4 text-lg font-semibold text-mainColor hover:underline"
//       >
//         {t("go_back")}
//       </Link>

//       {isLoading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant="danger">
//           {error?.data?.message || error.message}
//         </Message>
//       ) : (
//         <>
//           <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
//             <div className="relative flex-1">
//               <ProductsDetailsSwiper />
//               <HeartIcon product={product} className="absolute top-4 right-4" />
//             </div>

//             <div className="flex-1 px-4">
//               <h2 className="text-lg md:text-2xl text-secondColor">
//                 {product.name}
//               </h2>

//               <p className="mt-4 leading-relaxed text-gray-600">
//                 {descriptionToDisplay}
//               </p>

//               <h2 className="my-6 text-lg md:text-2xl text-mainColor">
//                 DZD {product.price}
//               </h2>

//               <div className="grid grid-cols-1 text-lg md:gap-6 sm:grid-cols-2">
//                 <div>
//                   <div className="flex items-center mb-2">
//                     <FaStore className="rtl:ml-2 ltr:mr-2 text-mainColor" />
//                     <p>
//                       {t("product_list_form_brand")}: {product.brand}
//                     </p>
//                   </div>
//                   <div className="flex items-center mb-2">
//                     <FaStar className="rtl:ml-2 ltr:mr-2 text-mainColor" />
//                     <p>
//                       {t("reviews")}: {product.numReviews}
//                     </p>
//                   </div>
//                 </div>
//                 <div>
//                   <div className="flex items-center mb-2">
//                     <FaShoppingCart className="rtl:ml-2 ltr:mr-2 text-mainColor" />
//                     <p>
//                       {t("product_list_form_count_in_stock")}:{" "}
//                       {product.countInStock}
//                     </p>
//                   </div>
//                   <div className="flex items-center mb-2">
//                     <FaBox className="rtl:ml-2 ltr:mr-2 text-mainColor" />
//                     <p>
//                       {" "}
//                       {t("product_list_form_quantity")}: {product.quantity}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {product.countInStock > 0 && (
//                 <select
//                   value={qty}
//                   onChange={(e) => setQty(e.target.value)}
//                   className="p-2 text-black bg-gray-100 border rounded-lg ltr:mr-4 rtl:ml-4"
//                 >
//                   {[...Array(product.countInStock).keys()].map((x) => (
//                     <option key={x + 1} value={x + 1}>
//                       {x + 1}
//                     </option>
//                   ))}
//                 </select>
//               )}

//               <button
//                 onClick={addToCartHandler}
//                 disabled={product.countInStock === 0}
//                 className={`!mt-8 button ${
//                   product.countInStock === 0
//                     ? "opacity-50 cursor-not-allowed"
//                     : ""
//                 }`}
//               >
//                 {t("add_to_cart")}
//               </button>
//             </div>
//           </div>

//           {/* Related Products Section */}
//           <div className="my-16">
//             <h2 className="mb-6 text-lg text-center md:text-2xl text-secondColor">
//               {t("related_products")}
//             </h2>

//             {loadingCategoryProducts ? (
//               <Loader />
//             ) : categoryError ? (
//               <Message variant="danger">
//                 {categoryError?.data?.message || categoryError.message}
//               </Message>
//             ) : (
//               <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
//                 {productsByCategory
//                   ?.filter((p) => p._id !== product?._id) // Exclude current product
//                   .map((relatedProduct) => {
//                     const descriptionToDisplay =
//                       i18n.language === "ar"
//                         ? relatedProduct.description_ar
//                         : relatedProduct.description;

//                     return (
//                       <div
//                         key={relatedProduct._id}
//                         className="relative w-full mx-auto transition-transform transform hover:scale-105"
//                       >
//                         <Link
//                           to={`/Produit/${relatedProduct._id}`}
//                           onClick={() =>
//                             handleLinkClick(`/Produit/${relatedProduct._id}`)
//                           }
//                           className="block overflow-hidden transition duration-300 ease-in-out rounded-lg shadow-lg hover:shadow-xl"
//                           style={{ width: "250px", height: "350px" }}
//                         >
//                           <img
//                             src={relatedProduct.image_one}
//                             alt={relatedProduct.name}
//                             className="object-cover w-full h-48 transition-transform duration-300 ease-in-out rounded-t-lg group-hover:scale-110"
//                           />
//                           <div className="flex flex-col justify-between h-32 p-4">
//                             <h4 className="text-lg font-semibold truncate text-secondColor">
//                               {relatedProduct.name}
//                             </h4>
//                             <p className="mt-2 font-bold text-mainColor">
//                               DZD {relatedProduct.price}
//                             </p>
//                             <p className="mt-1 text-sm text-gray-500 truncate">
//                               {descriptionToDisplay
//                                 ? descriptionToDisplay.slice(0, 60) + "..."
//                                 : "No description available."}
//                             </p>
//                           </div>
//                         </Link>
//                       </div>
//                     );
//                   })}
//               </div>
//             )}
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default ProductDetails;

import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductDetailsQuery } from "../../../Redux/Api/productApiSlice";
import Loader from "../../../Components/Ui/Loader/Loader";
import Message from "../../../Components/Ui/Message/Message";
import { FaBox, FaShoppingCart, FaStar, FaStore } from "react-icons/fa";
import HeartIcon from "../HeartIcon/HeartIcon";
import {
  addToCart,
  saveShippingAddress,
} from "../../../Redux/Features/Cart/cartSlice";
import { useTranslation } from "react-i18next";
import { useGetProductsByCategoryQuery } from "../../../Redux/Api/productApiSlice";
import ProductsDetailsSwiper from "./ProdutDetailsSwiper";
import { useCreateOrderMutation } from "../../../Redux/Api/orderApiSlice";
import {
  setShippingPrice,
  setTotalPrice,
  setProductTotalPrice,
} from "../../../Redux/Features/PriceSlice/PriceSlice";
import {
  setShippingRate,
  setSelectedWilaya,
} from "../../../Redux/Features/ShippingSlice/ShippingSlice";
import { wilayas } from "../../../Data/ShippingData";
import { toast } from "react-toastify";

const ProductDetails = () => {
  const { t, i18n } = useTranslation();
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);

  // Shipping form states
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [shippingMethod, setShippingMethod] = useState("house");

  // Redux selectors
  const shippingRate = useSelector((state) => state.shipping.shippingRate);
  const selectedWilaya = useSelector((state) => state.shipping.selectedWilaya);

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
    skip: !product?.category,
  });

  const [createOrder, { isLoading: orderLoading }] = useCreateOrderMutation();

  // Calculate prices
  const productTotalPrice = product ? product.price * qty : 0;
  const totalPrice = productTotalPrice + shippingRate;

  useEffect(() => {
    if (product) {
      dispatch(setProductTotalPrice(productTotalPrice));
      // Add product to cart automatically when component loads
      dispatch(addToCart({ ...product, qty }));
    }
  }, [dispatch, productTotalPrice, product, qty]);

  useEffect(() => {
    dispatch(setShippingPrice(shippingRate));
  }, [dispatch, shippingRate]);

  useEffect(() => {
    dispatch(setTotalPrice(totalPrice));
  }, [dispatch, totalPrice]);

  const handleLinkClick = (route) => {
    navigate(route);
    window.scrollTo(0, 0);
  };

  const handleWilayaChange = (e) => {
    const selected = e.target.value;
    dispatch(setSelectedWilaya(selected));

    const wilaya = wilayas.find((w) => w.name === selected);
    if (wilaya) {
      const rate =
        shippingMethod === "house" ? wilaya.houseRate : wilaya.descRate;
      dispatch(setShippingRate(rate !== "/" ? rate : 0));
    }
  };

  const handleShippingMethodChange = (e) => {
    const selectedMethod = e.target.value;
    setShippingMethod(selectedMethod);

    const wilaya = wilayas.find((w) => w.name === selectedWilaya);
    if (wilaya) {
      const rate =
        selectedMethod === "house" ? wilaya.houseRate : wilaya.descRate;
      dispatch(setShippingRate(rate !== "/" ? rate : 0));
    }
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    setNameError("");
    setPhoneError("");
    setAddressError("");

    // Validation
    if (name.length < 5 || name.length > 15) {
      setNameError(t("nameError"));
      return;
    }
    if (phone.length !== 10) {
      setPhoneError(t("phoneError"));
      return;
    }
    if (address.length < 5 || address.length > 30) {
      setAddressError(t("addressError"));
      return;
    }

    const shippingAddress = {
      address,
      name,
      phone,
      wilaya: selectedWilaya,
    };

    dispatch(saveShippingAddress(shippingAddress));

    const orderDetails = {
      orderItems: [{ ...product, qty }],
      shippingAddress,
      paymentMethod: "YourPaymentMethod",
      itemsPrice: productTotalPrice,
      shippingPrice: shippingRate,
      totalPrice: totalPrice,
    };

    try {
      await createOrder(orderDetails).unwrap();
      toast.success(`${t("order_success")}`);
      navigate("/Succès-de-la-commande");
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error(error?.data?.message || t("error_placing_order"));
    }
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

              {/* Shipping Form - Always visible */}
              <div className="p-6 mt-8 rounded-lg bg-gray-50">
                <h3 className="mb-6 text-xl font-semibold text-secondColor">
                  {t("shipping_header")}
                </h3>

                <form onSubmit={handleOrderSubmit}>
                  <div className="mb-4">
                    <label className="block mb-2 font-semibold text-secondColor">
                      {t("form_name")}
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-mainColor"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    {nameError && (
                      <p className="mt-1 text-sm text-red-500">{nameError}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block mb-2 font-semibold text-secondColor">
                      {t("table_phone")}
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-mainColor"
                      required
                      value={phone}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\s/g, "");
                        setPhone(value);
                        if (!/^\d{10}$/.test(value)) {
                          setPhoneError(t("phoneError"));
                        } else {
                          setPhoneError("");
                        }
                      }}
                    />
                    {phoneError && (
                      <p className="mt-1 text-sm text-red-500">{phoneError}</p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block mb-2 font-semibold text-secondColor">
                      {t("form_address")}
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-mainColor"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    {addressError && (
                      <p className="mt-1 text-sm text-red-500">
                        {addressError}
                      </p>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="block mb-2 font-semibold text-secondColor">
                      {t("form_select_wilaya")}
                    </label>
                    <select
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-mainColor"
                      value={selectedWilaya}
                      onChange={handleWilayaChange}
                      required
                    >
                      <option value="">{t("form_select_wilaya")}</option>
                      {wilayas.map((wilaya) => (
                        <option key={wilaya.name} value={wilaya.name}>
                          {wilaya.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label className="block mb-2 font-semibold text-secondColor">
                      {t("shipping_method")}
                    </label>
                    <div className="flex space-x-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="house"
                          checked={shippingMethod === "house"}
                          onChange={handleShippingMethodChange}
                          className="mx-2"
                          disabled={
                            selectedWilaya &&
                            wilayas.find((w) => w.name === selectedWilaya)
                              ?.houseRate === "/"
                          }
                        />
                        <p>{t("to_the_desc")}</p>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="desc"
                          checked={shippingMethod === "desc"}
                          onChange={handleShippingMethodChange}
                          className="mx-2"
                          disabled={
                            selectedWilaya &&
                            wilayas.find((w) => w.name === selectedWilaya)
                              ?.descRate === "/"
                          }
                        />
                        <p>{t("to_the_house")}</p>
                      </label>
                    </div>
                  </div>

                  {/* Price Summary */}
                  <div className="pt-4 mb-6 border-t">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{t("product_total")}:</span>
                      <span className="font-semibold text-mainColor">
                        DZD {productTotalPrice.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">
                        {t("shipping_price")}:
                      </span>
                      <span className="font-semibold text-mainColor">
                        DZD{" "}
                        {shippingRate !== 0 ? shippingRate.toFixed(2) : "0.00"}
                      </span>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                      <span>{t("total")}:</span>
                      <span className="text-mainColor">
                        DZD {totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 font-semibold text-white transition-colors rounded-lg bg-mainColor hover:bg-secondColor"
                    disabled={orderLoading || product.countInStock === 0}
                  >
                    {orderLoading ? <Loader /> : t("place_order")}
                  </button>
                </form>
              </div>
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
                  ?.filter((p) => p._id !== product?._id)
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
