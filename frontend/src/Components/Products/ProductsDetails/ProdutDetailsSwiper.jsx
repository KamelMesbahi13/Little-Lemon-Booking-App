import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useGetProductDetailsQuery } from "../../../Redux/Api/productApiSlice";
import { useParams } from "react-router-dom";
import Loader from "../../Ui/Loader/Loader";

const MyGallery = () => {
  const { id: productId } = useParams();

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  if (isLoading)
    return (
      <div>
        <Loader />
      </div>
    );

  if (error) {
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }

  const images = product
    ? [
        { original: product.image_one, thumbnail: product.image_one },
        { original: product.image_two, thumbnail: product.image_two },
        { original: product.image_three, thumbnail: product.image_three },
        { original: product.image_four, thumbnail: product.image_four },
      ]
    : [];

  return (
    <div className="rounded-images">
      <ImageGallery
        showPlayButton={false}
        items={images}
        lazyLoad
        renderItem={(item) => (
          <div className="flex items-center justify-center w-64 h-64 mx-auto overflow-hidden">
            <img
              src={item.original}
              alt=""
              className="object-cover w-full h-full"
            />
          </div>
        )}
        renderThumbInner={(item) => (
          <div className="flex items-center justify-center w-16 h-16 mx-auto overflow-hidden">
            <img
              src={item.thumbnail}
              alt=""
              className="object-cover w-full h-full"
            />
          </div>
        )}
      />
    </div>
  );
};

MyGallery.propTypes = {}; // Remove the productId requirement

export default MyGallery;
