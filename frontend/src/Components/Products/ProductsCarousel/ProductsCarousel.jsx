import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import Message from "../../Ui/Message/Message";
import { useGetTopProductsQuery } from "../../../Redux/Api/productApiSlice";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="mb-6 md:mb-0 w-[100%] md:w-1/2">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Slider {...settings} className="w-[70%] max-w-screen-lg mx-auto">
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id} className="p-4 bg-white rounded-lg shadow-md">
                <img
                  src={image}
                  alt={name}
                  className="object-cover w-full rounded-lg h-60"
                />
                <div className="mt-4">
                  <h2 className="text-lg font-semibold text-mainColor">
                    {name}
                  </h2>
                  <p className="text-xl text-red-500">${price}</p>
                  <p className="mt-2 text-gray-600">
                    {description.length > 150
                      ? `${description.substring(0, 150)}...`
                      : description}
                  </p>
                </div>
                <div className="flex justify-between mt-4 text-sm text-gray-600">
                  <div>
                    <p className="flex items-center">
                      <FaStore className="mr-1 text-mainColor" /> {brand}
                    </p>
                    <p className="flex items-center">
                      <FaClock className="mr-1 text-mainColor" />{" "}
                      {moment(createdAt).fromNow()}
                    </p>
                    <p className="flex items-center">
                      <FaStar className="mr-1 text-mainColor" /> {numReviews}{" "}
                      Reviews
                    </p>
                  </div>
                  <div>
                    <p className="flex items-center">
                      <FaStar className="mr-1 text-mainColor" />{" "}
                      {Math.round(rating)} Stars
                    </p>
                    <p className="flex items-center">
                      <FaShoppingCart className="mr-1 text-mainColor" />{" "}
                      {quantity} Available
                    </p>
                    <p className="flex items-center">
                      <FaBox className="mr-1 text-mainColor" /> {countInStock}{" "}
                      In Stock
                    </p>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
