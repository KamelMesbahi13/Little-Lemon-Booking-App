import {
  useGetTotalOrdersQuery,
  useGetTotalSalesQuery,
} from "../../../Redux/Api/orderApiSlice";
import AdminMenu from "../AdminMenu/AdminMenu";
import Loader from "../../Ui/Loader/Loader";
import UserOrder from "../../../User/UserOrder/UserOrder";
import { useTranslation } from "react-i18next";

const AdminDashboard = () => {
  const { t } = useTranslation();

  // Fetch necessary data
  const { data: sales, isLoading: loadingSales } = useGetTotalSalesQuery();
  const { data: orders, isLoading: loadingOrders } = useGetTotalOrdersQuery();

  return (
    <>
      <AdminMenu />

      <section className="xl:ml-[4rem] md:ml-[0rem] mb-28 p-8">
        <h1 className="my-4 textCenter text-mainColor">
          {" "}
          {t("admin_dashboard")}
        </h1>
        <div className="flex flex-wrap justify-around">
          <div className="bg-white shadow-lg rounded-lg p-6 w-[20rem] mt-5 transition-transform transform hover:scale-105">
            <div className="flex items-center justify-center bg-[#0a6bff] text-white rounded-full w-12 h-12 mb-4">
              <span className="text-2xl font-bold">$</span>
            </div>
            <p className="text-gray-600"> {t("sales")}</p>
            <h1 className="text-3xl font-bold text-[#065dd8]">
              {loadingSales ? (
                <Loader />
              ) : (
                `DZD ${sales?.totalSales?.toFixed(2)}`
              )}
            </h1>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 w-[20rem] mt-5 transition-transform transform hover:scale-105">
            <div className="flex items-center justify-center bg-[#0a6bff] text-white rounded-full w-12 h-12 mb-4">
              <span className="text-2xl font-bold">$</span>
            </div>
            <p className="text-gray-600">{t("nav_bar_orders")}</p>
            <h1 className="text-3xl font-bold text-[#065dd8]">
              {loadingOrders ? <Loader /> : orders?.totalOrders}
            </h1>
          </div>
        </div>
      </section>
      <div>
        <UserOrder />
      </div>
    </>
  );
};

export default AdminDashboard;
