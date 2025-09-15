// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { saveShippingAddress } from "../../../Redux/Features/Cart/cartSlice";
// import {
//   setShippingPrice,
//   setTotalPrice,
//   setProductTotalPrice,
// } from "../../../Redux/Features/PriceSlice/PriceSlice";
// import {
//   setShippingRate,
//   setSelectedWilaya,
// } from "../../../Redux/Features/ShippingSlice/ShippingSlice";
// import ProgressSteps from "../../Ui/ProgressSteps/ProgressSteps";
// import { wilayas } from "../../../Data/ShippingData";
// import { useTranslation } from "react-i18next";
// import { useCreateOrderMutation } from "../../../Redux/Api/orderApiSlice";
// import { toast } from "react-toastify";
// import Loader from "../../Ui/Loader/Loader";

// const Shipping = () => {
//   const { t } = useTranslation();
//   const cart = useSelector((state) => state.cart);
//   const { shippingAddress, cartItems } = cart;

//   const [address, setAddress] = useState(shippingAddress.address || "");
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");

//   const [nameError, setNameError] = useState("");
//   const [phoneError, setPhoneError] = useState("");
//   const [addressError, setAddressError] = useState("");

//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const shippingRate = useSelector((state) => state.shipping.shippingRate);
//   const selectedWilaya = useSelector((state) => state.shipping.selectedWilaya);
//   const [shippingMethod, setShippingMethod] = useState("house");

//   const productTotalPrice = cartItems.reduce(
//     (acc, item) => acc + item.price * item.qty,
//     0
//   );

//   const totalPrice = productTotalPrice + shippingRate;

//   const [createOrder, { isLoading }] = useCreateOrderMutation();

//   useEffect(() => {
//     dispatch(setProductTotalPrice(productTotalPrice));
//   }, [dispatch, productTotalPrice]);

//   useEffect(() => {
//     dispatch(setShippingPrice(shippingRate));
//   }, [dispatch, shippingRate]);

//   useEffect(() => {
//     dispatch(setTotalPrice(totalPrice));
//   }, [dispatch, totalPrice]);

//   const handleWilayaChange = (e) => {
//     const selected = e.target.value;
//     dispatch(setSelectedWilaya(selected));

//     const wilaya = wilayas.find((w) => w.name === selected);
//     if (wilaya) {
//       const rate =
//         shippingMethod === "house" ? wilaya.houseRate : wilaya.descRate;
//       dispatch(setShippingRate(rate !== "/" ? rate : 0)); // Set to 0 if rate is '/'
//     }
//   };

//   const handleShippingMethodChange = (e) => {
//     const selectedMethod = e.target.value;
//     setShippingMethod(selectedMethod);

//     const wilaya = wilayas.find((w) => w.name === selectedWilaya);
//     if (wilaya) {
//       const rate =
//         selectedMethod === "house" ? wilaya.houseRate : wilaya.descRate;
//       dispatch(setShippingRate(rate !== "/" ? rate : 0)); // Set to 0 if rate is '/'
//     }
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();

//     setNameError("");
//     setPhoneError("");
//     setAddressError("");

//     if (name.length < 5 || name.length > 15) {
//       setNameError(t("nameError"));
//       return;
//     }
//     if (phone.length !== 10) {
//       setPhoneError(t("phoneError"));
//       return;
//     }
//     if (address.length < 5 || address.length > 30) {
//       setAddressError(t("addressError"));
//       return;
//     }

//     dispatch(
//       saveShippingAddress({ address, name, phone, wilaya: selectedWilaya })
//     );
//     dispatch(setShippingPrice(shippingRate));
//     dispatch(setTotalPrice(totalPrice));

//     const orderDetails = {
//       orderItems: cartItems,
//       shippingAddress: {
//         address,
//         name,
//         phone,
//         wilaya: selectedWilaya,
//       },
//       paymentMethod: "YourPaymentMethod",
//       itemsPrice: productTotalPrice,
//       shippingPrice: shippingRate,
//       totalPrice: totalPrice,
//     };

//     try {
//       await createOrder(orderDetails).unwrap();
//       toast.success(`${t("order_success")}`);
//       navigate("/Succès-de-la-commande");
//       window.scrollTo(0, 0);
//     } catch (error) {
//       console.error("Error placing order:", error);
//       toast.error(error?.data?.message || t("error_placing_order"));
//     }
//   };

//   useEffect(() => {
//     if (!shippingAddress.address) {
//       navigate("/Livraison");
//       window.scrollTo(0, 0);
//     }
//   }, [navigate, shippingAddress]);

//   return (
//     <div className="container px-4 mx-auto mt-10 md:px-0">
//       <ProgressSteps step2={true} step3={false} />

//       <div className="flex flex-wrap items-center justify-center mt-4 md:mt-16">
//         <form
//           onSubmit={submitHandler}
//           className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg"
//         >
//           <h1 className="mb-6"> {t("shipping_header")}</h1>

//           <div className="mb-6">
//             <label className="block mb-2 font-semibold text-secondColor">
//               {t("form_name")}
//             </label>
//             <input
//               type="text"
//               className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-mainColor"
//               required
//               onChange={(e) => setName(e.target.value)}
//             />
//             {nameError && <p className="text-red">{nameError}</p>}
//           </div>

//           <div className="mb-6">
//             <label className="block mb-2 font-semibold text-secondColor">
//               {t("table_phone")}
//             </label>
//             <input
//               type="text"
//               className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-mainColor"
//               required
//               onChange={(e) => {
//                 const value = e.target.value.replace(/\s/g, "");
//                 setPhone(value);
//                 if (!/^\d{10}$/.test(value)) {
//                   setPhoneError(t("phoneError"));
//                 } else {
//                   setPhoneError("");
//                 }
//               }}
//             />
//             {phoneError && <p className="text-red">{phoneError}</p>}
//           </div>

//           <div className="mb-6">
//             <label className="block mb-2 font-semibold text-secondColor">
//               {t("form_address")}
//             </label>
//             <input
//               type="text"
//               className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-mainColor"
//               required
//               onChange={(e) => setAddress(e.target.value)}
//             />
//             {addressError && <p className="text-red">{addressError}</p>}
//           </div>

//           <div className="mb-6">
//             <label className="block mb-2 font-semibold text-secondColor">
//               {t("form_select_wilaya")}
//             </label>
//             <select
//               className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-mainColor"
//               value={selectedWilaya}
//               onChange={handleWilayaChange}
//               required
//             >
//               <option value="">{t("form_select_wilaya")}</option>
//               {wilayas.map((wilaya) => (
//                 <option key={wilaya.name} value={wilaya.name}>
//                   {wilaya.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="mb-6">
//             <label className="block mb-2 font-semibold text-secondColor">
//               {t("shipping_method")}
//             </label>
//             <div className="flex space-x-4">
//               <label className="flex items-center">
//                 <input
//                   type="radio"
//                   value="house"
//                   checked={shippingMethod === "house"}
//                   onChange={handleShippingMethodChange}
//                   className="mx-2"
//                   disabled={
//                     selectedWilaya &&
//                     wilayas.find((w) => w.name === selectedWilaya)
//                       ?.houseRate === "/"
//                   }
//                 />
//                 <p>{t("to_the_desc")}</p>
//               </label>
//               <label className="flex items-center">
//                 <input
//                   type="radio"
//                   value="desc"
//                   checked={shippingMethod === "desc"}
//                   onChange={handleShippingMethodChange}
//                   className="mx-2"
//                   disabled={
//                     selectedWilaya &&
//                     wilayas.find((w) => w.name === selectedWilaya)?.descRate ===
//                       "/"
//                   }
//                 />
//                 <p>{t("to_the_house")}</p>
//               </label>
//             </div>
//           </div>

//           <div className="mb-2 md:mb-6">
//             <h2 className="font-semibold md:text-xl text-mainColor">
//               <span>{t("product_total")}: </span>
//               <span>DZD {productTotalPrice.toFixed(2)}</span>
//             </h2>
//           </div>
//           <div className="my-2 md:my-6">
//             <h2 className="font-semibold md:text-xl text-mainColor">
//               <span>{t("shipping_price")}: </span>
//               <span>
//                 DZD {shippingRate !== 0 ? shippingRate.toFixed(2) : t("")}
//               </span>
//             </h2>
//           </div>
//           <div>
//             <h2 className="font-semibold md:text-xl text-mainColor">
//               <span>{t("total")}: </span>
//               <span>DZD {totalPrice.toFixed(2)}</span>
//             </h2>
//           </div>

//           <button
//             type="submit"
//             className="w-full py-3 mt-6 font-semibold text-white rounded-lg bg-mainColor hover:bg-secondColor"
//           >
//             {isLoading ? <Loader /> : t("place_order")}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Shipping;
