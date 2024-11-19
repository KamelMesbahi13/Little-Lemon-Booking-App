import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import HeartIcon from "../HeartIcon/HeartIcon";

const SmallProduct = ({ product }) => {
  const navigate = useNavigate();

  const handleLinkClick = (route) => {
    navigate(route);
    window.scrollTo(0, 0);
  };
  return (
    <div className="w-full p-4 mx-auto transition-all bg-white rounded-lg shadow-lg hover:shadow-xl lg:max-w-xs md:max-w-md sm:max-w-full">
      <div className="relative overflow-hidden rounded-t-lg">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-56 transition-transform duration-300 hover:scale-105"
        />
        <HeartIcon product={product} />
      </div>

      <div className="p-4 bg-[#ffffff]">
        <Link to={`/Produit/${product._id}`} onClick={handleLinkClick}>
          <h2 className="flex items-center justify-between text-lg font-semibold">
            <div className="truncate">{product.name}</div>
            <span className="px-3 py-1 ml-2 text-sm font-medium text-white rounded-full bg-secondColor">
              ${product.price}
            </span>
          </h2>
        </Link>
      </div>
    </div>
  );
};

SmallProduct.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default SmallProduct;
