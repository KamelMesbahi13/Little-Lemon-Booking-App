import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import HeartIcon from "../HeartIcon/HeartIcon";
import { addToCart } from "../../../Redux/Features/Cart/cartSlice";
import { useTranslation } from "react-i18next";

const ProductCard = ({ p }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const handleLinkClick = (route) => {
    navigate(route);
    window.scrollTo(0, 0);
  };

  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  const descriptionToDisplay =
    i18n.language === "ar" ? p.description_ar : p.description;

  return (
    <div className="mx-auto">
      <div className="md:max-w-xs w-56 mt-8 lg:mt-10 relative bg-[#eee] rounded-md shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out">
        <section className="relative">
          <Link to={`/Produit/${p._id}`} onClick={handleLinkClick}>
            <span className="absolute bottom-2 right-2 bg-[#ff0f0f] text-white text-xs font-medium px-2 py-1 rounded-full">
              {p?.brand}
            </span>
            <img
              className="w-full h-[15rem] rounded-t-md"
              src={p.image_one}
              alt={p.name}
            />
          </Link>
          <HeartIcon product={p} className="absolute top-1 right-1" />
        </section>

        <div className="p-3 text-black">
          <div className="flex items-center justify-between mb-2">
            <h5 className="text-lg font-semibold">{p?.name}</h5>
            <p className="font-medium text-[#0a6bff]">
              {p?.price?.toLocaleString("en-US", {
                style: "currency",
                currency: "DZD",
              })}
            </p>
          </div>

          <p
            className={`mb-3 text-xs text-gray-600 ${
              i18n.language === "ar" ? "rtl" : ""
            }`}
          >
            {descriptionToDisplay?.substring(0, 20)}...
          </p>

          <section className="flex items-center justify-between">
            <Link
              onClick={handleLinkClick}
              to={`/Produit/${p._id}`}
              className="inline-flex items-center px-3 py-2 bg-[#065dd8] text-white rounded-md hover:bg-[#0a6bff] focus:ring-2 focus:outline-none focus:ring-blue-300 transition-colors duration-200 ease-in-out text-sm"
            >
              {t("read_more")}
              <svg
                className="w-3 h-3 mx-1 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </Link>

            <button onClick={() => addToCartHandler(p, 1)}>
              <AiOutlineShoppingCart size={30} className="text-mainColor" />
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  p: PropTypes.object.isRequired,
};

export default ProductCard;
