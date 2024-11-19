import { Link, useNavigate } from "react-router-dom";
import HeartIcon from "../HeartIcon/HeartIcon";
import PropTypes from "prop-types";

const Product = ({ product }) => {
  const navigate = useNavigate();

  const handleLinkClick = (route) => {
    navigate(route);
    window.scrollTo(0, 0);
  };

  return (
    <div className="group relative w-full max-w-[20rem] mx-auto bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[16rem] object-cover rounded-t-xl transition-opacity duration-300 group-hover:opacity-90"
        />
        <HeartIcon product={product} />
      </div>

      <div className="p-5">
        <Link onClick={handleLinkClick} to={`/Produit/${product._id}`}>
          <h2 className="mb-2 text-lg font-semibold transition-colors duration-300 group-hover:text-secondColor">
            {product.name}
          </h2>
        </Link>
        <p className="mb-4 text-sm text-gray-500">
          {product.description.length > 60
            ? `${product.description.substring(0, 60)}...`
            : product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 text-sm font-bold text-white rounded-full bg-secondColor">
            $ {product.price}
          </span>
          <Link
            onClick={handleLinkClick}
            to={`/Produit/${product._id}`}
            className="font-semibold transition-colors duration-300 text-mainColor hover:text-secondColor"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default Product;
