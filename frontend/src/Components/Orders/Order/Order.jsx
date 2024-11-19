import { useParams } from "react-router-dom";
import Message from "../../Ui/Message/Message";
import { useSelector } from "react-redux";
import {
  useDeliverOrderMutation,
  useGetOrderDetailsQuery,
} from "../../../Redux/Api/orderApiSlice";
import Loader from "../../Ui/Loader/Loader";
import { useTranslation } from "react-i18next";

const Order = () => {
  const { t } = useTranslation();
  const { id: orderId } = useParams();

  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();
  const userInfo = useSelector((state) => state.auth.userInfo);

  const deliverHandler = async () => {
    try {
      await deliverOrder(orderId).unwrap();
      refetch();
    } catch (err) {
      console.error("Failed to deliver the order: ", err);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <Message variant="danger">
        {error?.data?.message || "An error occurred"}
      </Message>
    );
  }

  return (
    <div className="container p-4 mx-auto md:flex rtl:flex-row-reverse">
      <div className="pr-4 md:w-2/3">
        <div className="my-5 border border-[#eee] shadow-xl">
          {order && order.orderItems.length === 0 ? (
            <Message> {t("order_empty")}</Message>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-[#065dd8] text-white">
                  <tr>
                    <th className="p-2 ltr:text-left rtl:text-right">
                      {t("table_img")}
                    </th>
                    <th className="p-2 ltr:text-left rtl:text-right">
                      {t("nav_bar_products")}
                    </th>
                    <th className="p-2 ltr:text-left rtl:text-right">
                      {t("product_list_form_quantity")}
                    </th>
                    <th className="p-2 ltr:text-left rtl:text-right">
                      {t("unit_price")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderItems.map((item) => (
                    <tr key={item.product} className="border-b">
                      <td className="p-2">
                        <img
                          src={item.image_one}
                          alt={item.name}
                          className="object-cover w-16 h-16"
                        />
                      </td>
                      <td className="p-2">{item.name}</td>
                      <td className="p-2">{item.qty}</td>
                      <td className="p-2">DZD {item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className="md:w-1/3">
        <div className="p-6 mt-5 mb-4 bg-white border border-[#eee] rounded-lg shadow-xl">
          <h2 className="mb-4">{t("order_summary")}</h2>
          <p className="mt-2 mb-2 text-lg">
            <strong className="text-[#0a6bff]">{t("order")} :</strong>{" "}
            {order?._id}
          </p>

          <p className="mb-2 text-lg">
            <strong className="text-[#0a6bff]">{t("form_name")} :</strong>{" "}
            {order?.shippingAddress?.name}
          </p>

          <p className="mb-2 text-lg">
            <strong className="text-[#0a6bff]">{t("table_phone")} :</strong>{" "}
            {order?.shippingAddress?.phone}
          </p>

          <p className="mb-2 text-lg">
            <strong className="text-[#0a6bff]">{t("form_address")} :</strong>{" "}
            {order?.shippingAddress?.address}
          </p>
          <p className="mb-2 text-lg">
            <strong className="text-[#0a6bff]">{t("wilaya")} :</strong>{" "}
            {order?.shippingAddress?.wilaya}
          </p>

          <p className="mt-2 mb-4 text-lg">
            <strong className="text-[#0a6bff]">{t("total_price")} :</strong> DZD
            {order?.totalPrice}
          </p>
        </div>

        {userInfo && userInfo.isAdmin && !order.isDelivered && (
          <button
            className="button"
            onClick={deliverHandler}
            disabled={loadingDeliver}
          >
            {t("marked_as_delivered")}{" "}
          </button>
        )}
      </div>
    </div>
  );
};

export default Order;
