import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../../../Redux/Features/Cart/cartSlice";
import {
  setShippingPrice,
  setTotalPrice,
  setProductTotalPrice,
} from "../../../Redux/Features/PriceSlice/PriceSlice";
import {
  setShippingRate,
  setSelectedWilaya,
} from "../../../Redux/Features/ShippingSlice/ShippingSlice";
import ProgressSteps from "../../Ui/ProgressSteps/ProgressSteps";
import { wilayas } from "../../../Data/ShippingData";
import { useTranslation } from "react-i18next";

const Shipping = () => {
  const { t } = useTranslation();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, cartItems } = cart;

  const [address, setAddress] = useState(shippingAddress.address || "");
  const [name, setName] = useState(shippingAddress.name || "");
  const [phone, setPhone] = useState(shippingAddress.phone || "");

  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [addressError, setAddressError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shippingRate = useSelector((state) => state.shipping.shippingRate);
  const selectedWilaya = useSelector((state) => state.shipping.selectedWilaya);
  const [shippingMethod, setShippingMethod] = useState("house");

  // Calculate items total from cart
  const productTotalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const totalPrice = productTotalPrice + shippingRate;

  // Keep Redux price slice in sync
  useEffect(() => {
    dispatch(setProductTotalPrice(productTotalPrice));
  }, [dispatch, productTotalPrice]);

  useEffect(() => {
    dispatch(setShippingPrice(shippingRate));
  }, [dispatch, shippingRate]);

  useEffect(() => {
    dispatch(setTotalPrice(totalPrice));
  }, [dispatch, totalPrice]);

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

  const submitHandler = (e) => {
    e.preventDefault();

    // Reset errors
    setNameError("");
    setPhoneError("");
    setAddressError("");

    let hasError = false;

    if (name.length < 5 || name.length > 30) {
      setNameError(t("nameError"));
      hasError = true;
    }
    if (phone.length !== 10 || !/^\d{10}$/.test(phone)) {
      setPhoneError(t("phoneError"));
      hasError = true;
    }
    if (address.length < 5 || address.length > 50) {
      setAddressError(t("addressError"));
      hasError = true;
    }
    if (!selectedWilaya) {
      hasError = true;
    }

    if (hasError) return;

    // Save everything to Redux / localStorage before navigating
    dispatch(
      saveShippingAddress({ address, name, phone, wilaya: selectedWilaya })
    );
    dispatch(setShippingPrice(shippingRate));
    dispatch(setTotalPrice(totalPrice));

    // Also persist shipping rate directly to localStorage as a safety net
    // (PriceSlice is not persisted, so this ensures PlaceOrders always gets the correct value)
    localStorage.setItem("checkoutShippingRate", JSON.stringify(shippingRate));
    localStorage.setItem("checkoutWilaya", selectedWilaya);

    // Navigate to the order confirmation page
    navigate("/Passer-commande");
    window.scrollTo(0, 0);
  };

  return (
    <div className="container px-4 mx-auto mt-10 md:px-0">
      <ProgressSteps step2={true} step3={false} />

      <div className="flex flex-wrap items-center justify-center mt-4 md:mt-16">
        <form
          onSubmit={submitHandler}
          className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg"
        >
          <h1 className="mb-6">{t("shipping_header")}</h1>

          {/* Name */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-secondColor">
              {t("form_name")}
            </label>
            <input
              type="text"
              value={name}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-mainColor"
              required
              onChange={(e) => setName(e.target.value)}
            />
            {nameError && <p className="mt-1 text-sm text-red">{nameError}</p>}
          </div>

          {/* Phone */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-secondColor">
              {t("table_phone")}
            </label>
            <input
              type="text"
              value={phone}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-mainColor"
              required
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
              <p className="mt-1 text-sm text-red">{phoneError}</p>
            )}
          </div>

          {/* Address */}
          <div className="mb-6">
            <label className="block mb-2 font-semibold text-secondColor">
              {t("form_address")}
            </label>
            <input
              type="text"
              value={address}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-mainColor"
              required
              onChange={(e) => setAddress(e.target.value)}
            />
            {addressError && (
              <p className="mt-1 text-sm text-red">{addressError}</p>
            )}
          </div>

          {/* Wilaya selector */}
          <div className="mb-6">
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

          {/* Shipping method */}
          <div className="mb-6">
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
                <p>{t("to_the_house")}</p>
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
                    wilayas.find((w) => w.name === selectedWilaya)?.descRate ===
                      "/"
                  }
                />
                <p>{t("to_the_desc")}</p>
              </label>
            </div>
          </div>

          {/* Price summary */}
          <div className="mb-2 md:mb-4">
            <h2 className="font-semibold md:text-lg text-mainColor">
              <span>{t("product_total")}: </span>
              <span>DZD {productTotalPrice.toFixed(2)}</span>
            </h2>
          </div>
          <div className="my-2 md:my-4">
            <h2 className="font-semibold md:text-lg text-mainColor">
              <span>{t("shipping_price")}: </span>
              <span>
                {shippingRate > 0
                  ? `DZD ${shippingRate.toFixed(2)}`
                  : selectedWilaya
                  ? t("not_available") || "غير متوفر"
                  : "—"}
              </span>
            </h2>
          </div>
          <div className="mb-4">
            <h2 className="font-semibold md:text-lg text-mainColor">
              <span>{t("total")}: </span>
              <span>DZD {totalPrice.toFixed(2)}</span>
            </h2>
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-2 font-semibold text-white rounded-lg bg-mainColor hover:bg-secondColor"
          >
            {t("place_order") || "متابعة"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
