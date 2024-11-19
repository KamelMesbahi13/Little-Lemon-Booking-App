import { useGetTopProductsQuery } from "../../../Redux/Api/productApiSlice";
import Loader from "../../Ui/Loader/Loader";
import ProductCarousel from "../ProductsCarousel/ProductsCarousel";
import SmallProduct from "../SmallProduct/SmallProduct";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return (
      <div className="mt-40">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <h1>ERROR</h1>;
  }

  return (
    <>
      <div className="flex flex-col-reverse items-center justify-between mt-12 md:mt-20 md:flex-row">
        <div>
          <div className="grid grid-cols-2">
            {data.map((product) => (
              <div key={product._id}>
                <SmallProduct product={product} />
              </div>
            ))}
          </div>
        </div>
        <ProductCarousel />
      </div>
    </>
  );
};

export default Header;
