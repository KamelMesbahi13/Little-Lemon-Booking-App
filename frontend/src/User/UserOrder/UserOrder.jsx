// import { Link, useNavigate } from "react-router-dom";
// import { useGetOrdersQuery } from "../../Redux/Api/orderApiSlice";
// import Loader from "../../Components/Ui/Loader/Loader";
// import Message from "../../Components/Ui/Message/Message";
// import { useState } from "react";
// import { useTranslation } from "react-i18next";

// const UserOrder = () => {
//   const { t } = useTranslation();
//   const navigate = useNavigate();

//   const ToOrderHandler = (route) => {
//     navigate(route);
//     window.scrollTo(0, 0);
//   };

//   const { data: orders, isLoading, error } = useGetOrdersQuery();

//   // State for the filter
//   const [filter, setFilter] = useState("all");

//   // Filter and sort orders based on the filter and creation date
//   const filteredOrders = orders
//     ? orders.filter((order) => {
//         if (filter === "delivered") return order.isDelivered;
//         if (filter === "notDelivered") return !order.isDelivered;
//         return true; // If filter is "all", return all orders
//       })
//     : [];

//   const sortedOrders = filteredOrders.sort(
//     (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//   );

//   return (
//     <div className="container px-4 py-8 mx-auto">
//       <h1 className="mb-6">{t("my_order_header")}</h1>

//       <div className="flex mt-12 mb-20 space-x-4 filter-buttons">
//         <button
//           className={`filter-button ${filter === "all" ? "active" : ""}`}
//           onClick={() => setFilter("all")}
//         >
//           {t("all_the_orders")}
//         </button>
//         <button
//           className={`filter-button ${filter === "delivered" ? "active" : ""}`}
//           onClick={() => setFilter("delivered")}
//         >
//           {t("delivered")}
//         </button>
//         <button
//           className={`filter-button ${
//             filter === "notDelivered" ? "active" : ""
//           }`}
//           onClick={() => setFilter("notDelivered")}
//         >
//           {t("not_delivered")}
//         </button>
//       </div>

//       {isLoading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant="danger">{error?.data?.error || error.error}</Message>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full border-collapse shadow-lg table-auto">
//             <thead>
//               <tr className="text-white bg-secondColor">
//                 <th className="px-4 py-2 rtl:text-right">{t("table_img")}</th>
//                 <th className="px-4 py-2 rtl:text-right">{t("table_id")}</th>
//                 <th className="px-4 py-2 rtl:text-right">{t("table_date")}</th>
//                 <th className="px-4 py-2 rtl:text-right">{t("table_total")}</th>
//                 <th className="px-4 py-2 rtl:text-right">
//                   {t("table_delivered")}
//                 </th>
//                 <th className="px-4 py-2 rtl:text-right">{t("table_name")}</th>
//                 <th className="px-4 py-2 rtl:text-right">{t("table_phone")}</th>
//                 <th className="px-4 py-2"></th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {sortedOrders.map((order) => (
//                 <tr key={order._id} className="hover:bg-gray-50">
//                   <td className="px-4 py-3">
//                     <img
//                       src={order.orderItems[0].image_one}
//                       alt={order.user}
//                       className="w-16 h-16 rounded-lg"
//                     />
//                   </td>
//                   <td className="px-4 py-3">{order._id}</td>
//                   <td className="px-4 py-3">
//                     {new Date(order.createdAt).toLocaleString()}
//                   </td>
//                   <td className="px-4 py-3 text-[#5cb85c]">
//                     DZD {order.totalPrice}
//                   </td>
//                   <td className="px-4 py-3">
//                     {order.isDelivered ? (
//                       <span className="inline-block w-24 px-3 py-1 text-center text-xs text-white bg-[#5cb85c] rounded-full">
//                         {t("delivered")}
//                       </span>
//                     ) : (
//                       <span className="inline-block w-24 px-3 py-1 text-xs text-center text-white rounded-full bg-red">
//                         {t("not_delivered")}
//                       </span>
//                     )}
//                   </td>
//                   <td className="px-4 py-3">{order.shippingAddress.name}</td>
//                   <td className="px-4 py-3">{order.shippingAddress.phone}</td>
//                   <td className="px-4 py-3">
//                     <Link
//                       to={`/Commande/${order._id}`}
//                       onClick={ToOrderHandler}
//                     >
//                       <button className="button">{t("view_details")}</button>
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserOrder;

import { Link, useNavigate } from "react-router-dom";
import { useGetOrdersQuery } from "../../Redux/Api/orderApiSlice";
import Loader from "../../Components/Ui/Loader/Loader";
import Message from "../../Components/Ui/Message/Message";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const UserOrder = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const ToOrderHandler = (route) => {
    navigate(route);
    window.scrollTo(0, 0);
  };

  const { data: orders, isLoading, error } = useGetOrdersQuery();

  // State for the filter
  const [filter, setFilter] = useState("all");

  // Filter and sort orders based on the filter and creation date
  const filteredOrders = orders
    ? orders.filter((order) => {
        if (filter === "delivered") return order.isDelivered;
        if (filter === "notDelivered") return !order.isDelivered;
        return true; // If filter is "all", return all orders
      })
    : [];

  const sortedOrders = filteredOrders.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="mb-6">{t("my_order_header")}</h1>

      <div className="flex mt-12 mb-20 space-x-4 filter-buttons">
        <button
          className={`filter-button ${filter === "all" ? "active" : ""}`}
          onClick={() => setFilter("all")}
        >
          {t("all_the_orders")}
        </button>
        <button
          className={`filter-button ${filter === "delivered" ? "active" : ""}`}
          onClick={() => setFilter("delivered")}
        >
          {t("delivered")}
        </button>
        <button
          className={`filter-button ${
            filter === "notDelivered" ? "active" : ""
          }`}
          onClick={() => setFilter("notDelivered")}
        >
          {t("not_delivered")}
        </button>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.error || error.error}</Message>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse shadow-lg table-auto">
            <thead>
              <tr className="text-white bg-secondColor">
                <th className="px-4 py-2 rtl:text-right">{t("table_img")}</th>
                <th className="px-4 py-2 rtl:text-right">{t("table_id")}</th>
                <th className="px-4 py-2 rtl:text-right">{t("table_date")}</th>
                <th className="px-4 py-2 rtl:text-right">{t("table_total")}</th>
                <th className="px-4 py-2 rtl:text-right">
                  {t("shipping_price")}
                </th>
                <th className="px-4 py-2 rtl:text-right">
                  {t("shipping_address")}
                </th>
                <th className="px-4 py-2 rtl:text-right">
                  {t("table_delivered")}
                </th>
                <th className="px-4 py-2 rtl:text-right">{t("table_name")}</th>
                <th className="px-4 py-2 rtl:text-right">{t("table_phone")}</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <img
                      src={order.orderItems[0].image_one}
                      alt={order.user}
                      className="w-16 h-16 rounded-lg"
                    />
                  </td>
                  <td className="px-4 py-3">{order._id}</td>
                  <td className="px-4 py-3">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-3 text-[#5cb85c]">
                    DZD {order.totalPrice}
                  </td>
                  <td className="px-4 py-3 text-[#5cb85c]">
                    DZD {order.shippingPrice || 0}
                  </td>
                  <td className="px-4 py-3">
                    <div className="max-w-xs">
                      <div className="text-sm font-medium">
                        {order.shippingAddress.wilaya}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {order.shippingAddress.address}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {order.isDelivered ? (
                      <span className="inline-block w-24 px-3 py-1 text-center text-xs text-white bg-[#5cb85c] rounded-full">
                        {t("delivered")}
                      </span>
                    ) : (
                      <span className="inline-block w-24 px-3 py-1 text-xs text-center text-white rounded-full bg-red">
                        {t("not_delivered")}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">{order.shippingAddress.name}</td>
                  <td className="px-4 py-3">{order.shippingAddress.phone}</td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/Commande/${order._id}`}
                      onClick={ToOrderHandler}
                    >
                      <button className="button">{t("view_details")}</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserOrder;
