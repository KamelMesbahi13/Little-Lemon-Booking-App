import { IoCartOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

const Cart = () => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <div>
      <div className="flex items-center">
        <div>
          <i className="text-3xl">
            <IoCartOutline />
          </i>
        </div>
        <div>
          {cartItems.length > 0 && (
            <span>
              <span className="px-1 py-0 text-sm text-white rounded-full font-b bg-mainColor">
                {cartItems.reduce((a, c) => a + Number(c.qty), 0)}{" "}
              </span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
