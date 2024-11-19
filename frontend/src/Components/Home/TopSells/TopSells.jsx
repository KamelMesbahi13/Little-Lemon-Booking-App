import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useGetProductsQuery } from "../../../Redux/Api/productApiSlice";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../../Redux/Features/Cart/cartSlice";
import Loader from "../../Ui/Loader/Loader";

const TopSells = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  const handleLinkClick = (route) => {
    navigate(route);
    window.scrollTo(0, 0);
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
    >
      <div className="my-12 md:my-20">
        <div className="SalesAndBestSalesBack">
          <div className="container">
            <div className="textCenter">
              <h1>{t("best_sells_header")}</h1>
              <h6 className="hSixTitle">{t("best_sells_subheader")}</h6>
            </div>
            <div className="flex items-center justify-center mt-8 md:mt-20">
              {isLoading ? (
                <Loader />
              ) : isError ? (
                <p>{t("error_occurred")}</p>
              ) : (
                <div className="grid grid-cols-1 px-4 gap-x-8 gap-y-8 md:gap-y-20 md:grid-cols-2 xl:grid-cols-4">
                  {data?.products?.slice(0, 4).map((item, index) => {
                    const descriptionToDisplay =
                      i18n.language === "ar"
                        ? item.description_ar
                        : item.description;

                    return (
                      <div
                        key={item.id || index}
                        className="flex justify-center"
                      >
                        <div className="md:w-64 w-52  py-8 duration-500 border-2 border-[transparent] hover:border-2 hover:border-[#eee] hover:shadow-lg">
                          <div className="textCenter">
                            <img
                              className="w-full h-64 "
                              src={item.image_one}
                              alt={item.name}
                            />
                          </div>
                          <div className="px-4">
                            <div>
                              <div className="my-4">
                                <h6 className="text-lg">{item.name}</h6>
                              </div>
                              <div>
                                <p
                                  className={`mb-4 text-sm text-gray-600 ${
                                    i18n.language === "ar" ? "rtl" : ""
                                  }`}
                                >
                                  {descriptionToDisplay?.substring(0, 15)}...
                                </p>
                              </div>
                            </div>
                            <div className="mt-2 mb-4 md:mt-2 md:mb-8">
                              <p className="text-sm italic font-bold textRight text-[#0a6bff]">
                                DZD {item.price}
                              </p>
                            </div>
                            <div>
                              <div className="flex justify-between">
                                <div>
                                  <button
                                    className="buttonTwo"
                                    onClick={() =>
                                      handleLinkClick(`/Produit/${item._id}`)
                                    }
                                  >
                                    {t("buy_button")}
                                  </button>
                                </div>
                                <div className="flex">
                                  <div>
                                    <button
                                      className="buttonTwo"
                                      onClick={() => addToCartHandler(item, 1)}
                                    >
                                      {t("add_to_cart")}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TopSells;
