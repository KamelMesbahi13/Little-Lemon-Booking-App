import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../../Redux/Features/Cart/cartSlice";
import { useTranslation } from "react-i18next";

const Cart = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/Livraison");
  };

  return (
    <>
      <div className="container p-4 mx-auto mt-8">
        {cartItems.length === 0 ? (
          <div className="text-lg text-center">
            {t("cart_empty")}{" "}
            <Link to="/Produits" className="text-mainColor hover:underline">
              {t("go_to_shop")}{" "}
            </Link>
          </div>
        ) : (
          <div className="flex flex-col justify-between lg:flex-row lg:rtl:flex-row-reverse">
            <div className="w-full lg:w-3/4">
              <h1 className="mb-4 text-2xl font-semibold text-mainColor">
                {t("shopping_cart")}{" "}
              </h1>

              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between p-4 mb-6 bg-white rounded-lg shadow-md"
                >
                  <div className="w-20 h-20 mb-4 lg:mb-0">
                    <img
                      src={item.image_one}
                      alt={item.name}
                      className="object-cover w-full h-full rounded-lg"
                    />
                  </div>

                  <div className="flex-1 text-center lg:ml-6 lg:text-left">
                    <Link
                      to={`/Produit/${item._id}`}
                      className="text-secondColor hover:underline"
                    >
                      {item.name}
                    </Link>

                    <div className="mt-2 text-gray-500">{item.brand}</div>
                    <div className="mt-2 font-bold md:text-lg text-mainColor">
                      DZD {item.price}
                    </div>
                  </div>

                  <div className="w-24">
                    <select
                      className="w-1/2 p-2 bg-white border rounded-lg textCenter md:text-start md:w-3/4"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    className="text-red lg:mx-6 lg:mt-0"
                    onClick={() => removeFromCartHandler(item._id)}
                  >
                    <FaTrash className="text-xl" />
                  </button>
                </div>
              ))}
            </div>

            <div className="w-full mt-8 lg:w-1/4 lg:ml-6 lg:mt-0">
              <div className="p-6 bg-white rounded-lg shadow-xl">
                <h2 className="mb-4 text-xl font-semibold text-mainColor">
                  {t("summary")}{" "}
                </h2>

                <div className="mb-4 text-lg font-bold">
                  {t("total")} (
                  {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)}{" "}
                  {t("item")}):
                </div>
                <h2 className="text-xl font-bold text-secondColor">
                  DZD
                  {cartItems
                    .reduce(
                      (acc, item) =>
                        acc + Number(item.qty) * Number(item.price),
                      0
                    ) // Ensure qty and price are treated as numbers
                    .toFixed(2)}
                </h2>

                <button
                  className="!mt-4 button md:!w-full"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  {t("buy_button")}{" "}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
