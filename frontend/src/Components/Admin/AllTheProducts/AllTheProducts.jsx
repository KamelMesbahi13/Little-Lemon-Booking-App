import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../../Redux/Api/productApiSlice";
import AdminMenu from "../AdminMenu/AdminMenu";
import { useTranslation } from "react-i18next";
import Loader from "../../Ui/Loader/Loader";

const AllTheProducts = () => {
  const { t } = useTranslation();
  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) {
    return (
      <div className="mt-20 textCenter">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-2xl font-semibold text-[#ff0f0f]">
            Error loading products.
          </p>
          <p className="text-red">Please try again later.</p>
        </div>
      </div>
    );
  }

  const topHandler = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="container px-4 py-6 mx-auto">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-3/4">
          <h1 className="my-8 md:my-16">
            {t("all_products")} ({products.length})
          </h1>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div
                key={product._id}
                className="block overflow-hidden transition-shadow duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl"
              >
                <Link
                  to={`/admin/produit/modification/${product._id}`}
                  onClick={topHandler}
                  className="relative block"
                >
                  <img
                    src={product.image_one}
                    alt={product.name}
                    className="object-cover w-full h-48"
                  />
                  <div className="absolute top-2 right-2 bg-[#ff0f0f] text-white text-sm px-2 py-1 rounded-md">
                    $ {product?.price}
                  </div>
                </Link>
                <div className="p-4">
                  <h5 className="text-lg font-semibold mb-2 text-[#0a6bff]">
                    {product?.name}
                  </h5>
                  <p className="mb-4 text-sm text-gray-500">
                    {product?.description?.substring(0, 100)}...
                  </p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={topHandler}
                      className="text-white bg-[#0a6bff] hover:bg-[#065dd8] px-3 py-2 rounded-md transition-colors duration-200"
                    >
                      <Link to={`/admin/produit/modification/${product._id}`}>
                        {t("edit")}
                      </Link>
                    </button>
                    <p className="text-xs text-gray-400">
                      {moment(product.createdAt).format("MMMM Do YYYY")}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 mt-6 md:w-1/4">
          <AdminMenu />
        </div>
      </div>
    </div>
  );
};

export default AllTheProducts;
