import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCreateOrderMutation } from "../../../Redux/Api/orderApiSlice";
import Message from "../../Ui/Message/Message";
import ProgressSteps from "../../Ui/ProgressSteps/ProgressSteps";
import Loader from "../../Ui/Loader/Loader";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const PlaceOrder = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const shipping = useSelector((state) => state.shipping); // Get the shipping state (for Wilaya)
  const prices = useSelector((state) => ({
    itemsPrice: state.price.productTotalPrice,
    shippingPrice: state.price.shippingPrice,
  }));

  const [{ isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/Livraison");
    }
  }, [cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    navigate("/");
    window.scrollTo(0, 0);
  };

  return (
    <>
      <ProgressSteps step2 step3 />

      <div className="container px-4 mx-auto mt-8 md:px-0">
        {cart.cartItems.length === 0 ? (
          <Message> {t("cart_empty")}</Message>
        ) : (
          <div className="overflow-x-auto rounded-lg shadow-lg">
            <table className="w-full border-collapse table-auto wh">
              <thead className="bg-[#065dd8]">
                <tr className="text-white">
                  <th className="px-4 py-2 text-left rtl:text-right">
                    {t("table_img")}
                  </th>
                  <th className="px-4 py-2 text-left rtl:text-right">
                    {t("nav_bar_products")}
                  </th>
                  <th className="px-4 py-2 text-left rtl:text-right">
                    {" "}
                    {t("product_list_form_quantity")}
                  </th>
                  <th className="px-4 py-2 text-left rtl:text-right">
                    {" "}
                    {t("product_list_form_price")}
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {cart.cartItems.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-4">
                      <img
                        src={item.image_one}
                        alt={item.name}
                        className="object-cover w-16 h-16 rounded-lg"
                      />
                    </td>
                    <td className="p-4">{item.name}</td>
                    <td className="p-4">{item.qty}</td>
                    <td className="p-4">DZD {item.price.toFixed(2)} </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-8">
          <h2 className="mb-5 font-semibold text-gray-900">
            {t("order_summary")}
          </h2>
          <div className="flex flex-col justify-between bg-[#eee] p-8 mb-4 shadow-xl rounded-lg md:flex-row">
            <ul className="mb-6 md:mb-0">
              <li className="mb-4 text-lg">
                <p className="font-semibold">{t("item")}:</p> DZD
                {prices.itemsPrice.toFixed(2)}
              </li>
              <li className="mb-4 text-lg">
                <p className="font-semibold">{t("shipping_header")}:</p> DZD
                {prices.shippingPrice.toFixed(2)}
              </li>
              <li className="text-lg">
                <p className="font-semibold">{t("table_total")}:</p> DZD
                {(prices.itemsPrice + prices.shippingPrice).toFixed(2)}
              </li>
            </ul>

            {error && (
              <Message variant="danger" className="text-[#ff0f0f]">
                {error.data.message}
              </Message>
            )}

            <div>
              <h2 className="mb-4 text-xl font-bold">{t("shipping_header")}</h2>
              <div className="flex mb-4">
                <p className="font-semibold ltr:mr-2 rtl:ml-2">
                  {t("form_name")}:
                </p>
                <p>{cart.shippingAddress.name}</p>
              </div>

              <div className="flex mb-4">
                <p className="font-semibold ltr:mr-2 rtl:ml-2">
                  {t("table_phone")}:
                </p>
                <p>{cart.shippingAddress.phone}</p>
              </div>

              <div className="flex mb-4">
                <p className="font-semibold ltr:mr-2 rtl:ml-2">
                  {t("wilaya")}:
                </p>
                <p>{shipping.selectedWilaya}</p>
              </div>

              <div className="flex mb-4">
                <p className="font-semibold ltr:mr-2 rtl:ml-2">
                  {t("form_address")}:
                </p>
                <p>{cart.shippingAddress.address}</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="button"
            disabled={cart.cartItems.length === 0}
            onClick={placeOrderHandler}
          >
            {t("get_back_to_home")}
          </button>

          {isLoading && <Loader />}
        </div>
      </div>
    </>
  );
};

export default PlaceOrder;
