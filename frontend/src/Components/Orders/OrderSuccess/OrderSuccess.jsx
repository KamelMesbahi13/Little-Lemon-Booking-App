import { FaCircleCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const OrderSuccess = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const ToShopHandler = () => {
    navigate("/Produits");
    window.scrollTo(0, 0);
  };

  const ToHomeHandler = () => {
    navigate("/Passer-commande");
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex items-center justify-center px-4 mt-12 md:mt-0 md:h-screen">
      <div className="relative w-full max-w-lg p-6 text-center bg-white rounded-lg shadow-2xl sm:p-8">
        <div className="flex justify-center mb-6">
          <i className="text-5xl text-mainColor">
            <FaCircleCheck />
          </i>
        </div>
        <h2 className="mb-4 text-lg font-semibold sm:text-xl">
          {t("thank_you_for_ordering")}
        </h2>
        <p className="mb-8 text-sm sm:text-base">
          {t("thank_you_for_choosing")}
        </p>
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={ToHomeHandler}
            className="button !bg-white !text-mainColor border border-mainColor px-4 py-2 rounded-md sm:w-1/2"
          >
            {t("go_to_recipe")}
          </button>
          <button
            onClick={ToShopHandler}
            className="button !bg-mainColor text-white px-4 py-2 rounded-md sm:w-1/2"
          >
            {t("got_to_shop")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
