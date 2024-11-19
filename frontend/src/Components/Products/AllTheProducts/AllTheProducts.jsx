import { useParams } from "react-router-dom";
import Header from "../Header/Header";
import Message from "../../Ui/Message/Message";
import Loader from "../../Ui/Loader/Loader";
import { useGetProductsQuery } from "../../../Redux/Api/productApiSlice";
import Product from "../Product/Product";
import { useNavigate } from "react-router-dom";

const AllTheProducts = () => {
  const navigate = useNavigate();

  const ToShopHandler = () => {
    navigate("/Boutique");
    window.scrollTo(0, 0);
  };
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <div className="mt-32">
          <Loader />
        </div>
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <>
          <div className="flex items-center justify-between mx-6 my-20 md:my-40 md:mx-16 lg:mx-20">
            <h1 className="text-mainColor">Special Products</h1>

            <span
              onClick={ToShopHandler}
              className="px-6 py-2 font-bold text-white rounded-full cursor-pointer bg-red md:px-8 lg:px-10"
            >
              Shop
            </span>
          </div>

          <div className="mt-8">
            <div className="grid grid-cols-1 gap-6 mx-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:mx-16 lg:mx-20">
              {data.products.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AllTheProducts;
