import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateProductMutation } from "../../../Redux/Api/productApiSlice";
import { useFetchCategoriesQuery } from "../../../Redux/Api/categoryApiSlice";
import { toast } from "react-toastify";
import AdminMenu from "../AdminMenu/AdminMenu";
import { useTranslation } from "react-i18next";
import ImageUploadOne from "../../ImageUploadOne";
import ImageUploadTwo from "../../ImageUploadTwo";
import ImageUploadThree from "../../ImageUploadThree";
import ImageUploadFour from "../../ImageUploadFour";

const ProductList = () => {
  const { t } = useTranslation();
  const [imageOne, setImageOne] = useState(null);
  const [imageTwo, setImageTwo] = useState(null);
  const [imageThree, setImageThree] = useState(null);
  const [imageFour, setImageFour] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionAr, setDescriptionAr] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrlOne, setImageUrlOne] = useState(null); // Separate state for image one preview
  const [imageUrlTwo, setImageUrlTwo] = useState(null);
  const [imageUrlThree, setImageUrlThree] = useState(null);
  const [imageUrlFour, setImageUrlFour] = useState(null);

  const navigate = useNavigate();

  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageOne || !imageTwo || !imageThree || !imageFour) {
      toast.error(t("toast_img_required"));
      return;
    }

    if (!name) {
      toast.error(t("toast_name_required"));
      return;
    }
    if (!description) {
      toast.error(t("toast_description_required"));
      return;
    }
    if (!descriptionAr) {
      toast.error(t("toast_description_ar_required"));
      return;
    }
    if (!price) {
      toast.error(t("toast_price_required"));
      return;
    }
    if (!category) {
      toast.error(t("toast_category_required"));
      return;
    }
    if (!quantity) {
      toast.error(t("toast_quantity_required"));
      return;
    }
    if (!brand) {
      toast.error(t("toast_brand_required"));
      return;
    }

    try {
      const productData = new FormData();
      productData.append("image_one", imageOne);
      productData.append("image_two", imageTwo);
      productData.append("image_three", imageThree);
      productData.append("image_four", imageFour);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("description_ar", descriptionAr);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("quantity", quantity);
      productData.append("brand", brand);
      productData.append("countInStock", stock);

      const { data } = await createProduct(productData);

      if (data.error) {
        toast.error(`${t("product_creation_failed")}`);
      } else {
        toast.success(`${data.name} ${t("been_created")}`);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error(`${t("product_creation_failed")}`);
    }
  };

  return (
    <div className="container px-4 mx-auto mt-12 lg:px-8">
      <div className="flex flex-col lg:flex-row">
        <AdminMenu />
        <div className="p-4 bg-white rounded-lg shadow-md lg:w-3/4">
          <h1 className="mb-8 md:mb-12">{t("product_list_header")}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {imageUrlOne && (
              <div className="mb-4 text-center">
                <img
                  src={imageUrlOne}
                  alt="product one"
                  className="block mx-auto max-h-[200px] object-cover"
                />
              </div>
            )}
            {imageUrlTwo && (
              <div className="mb-4 text-center">
                <img
                  src={imageUrlTwo}
                  alt="product two"
                  className="block mx-auto max-h-[200px] object-cover"
                />
              </div>
            )}

            {imageUrlThree && (
              <div className="mb-4 text-center">
                <img
                  src={imageUrlThree}
                  alt="product three"
                  className="block mx-auto max-h-[200px] object-cover"
                />
              </div>
            )}

            {imageUrlFour && (
              <div className="mb-4 text-center">
                <img
                  src={imageUrlFour}
                  alt="product Four"
                  className="block mx-auto max-h-[200px] object-cover"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <ImageUploadOne
              setImage={setImageOne}
              setImageUrl={setImageUrlOne}
            />
            <ImageUploadTwo
              setImage={setImageTwo}
              setImageUrl={setImageUrlTwo}
            />
            <ImageUploadThree
              setImage={setImageThree}
              setImageUrl={setImageUrlThree}
            />
            <ImageUploadFour
              setImage={setImageFour}
              setImageUrl={setImageUrlFour}
            />
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 mb-4 lg:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-1 text-sm font-semibold"
                >
                  {t("product_list_form_name")}
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-3 bg-gray-[#eee] border rounded-lg"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="price"
                  className="block mb-1 text-sm font-semibold"
                >
                  {t("product_list_form_price")}
                </label>
                <input
                  type="number"
                  id="price"
                  className="w-full p-3 bg-gray-[#eee] border rounded-lg"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-4 lg:grid-cols-2">
              <div>
                <label
                  htmlFor="quantity"
                  className="block mb-1 text-sm font-semibold"
                >
                  {t("product_list_form_quantity")}
                </label>
                <input
                  type="number"
                  id="quantity"
                  className="w-full p-3 bg-gray-[#eee] border rounded-lg"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="brand"
                  className="block mb-1 text-sm font-semibold"
                >
                  {t("product_list_form_brand")}
                </label>
                <input
                  type="text"
                  id="brand"
                  className="w-full p-3 bg-gray-[#eee] border rounded-lg"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block mb-1 text-sm font-semibold"
              >
                {t("product_list_form_description")}
              </label>
              <textarea
                id="description"
                className="w-full p-3 bg-gray-[#eee] border rounded-lg"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="mb-4">
              <label
                htmlFor="description_ar"
                className="block mb-1 text-sm font-semibold"
              >
                {t("product_list_form_description_ar")}
              </label>
              <textarea
                id="description_ar"
                className="w-full p-3 bg-gray-[#eee] border rounded-lg"
                value={descriptionAr}
                onChange={(e) => setDescriptionAr(e.target.value)}
                required
              ></textarea>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-4 lg:grid-cols-2">
              <div>
                <label
                  htmlFor="stock"
                  className="block mb-1 text-sm font-semibold"
                >
                  {t("product_list_form_count_in_stock")}
                </label>
                <input
                  type="number"
                  id="stock"
                  className="w-full p-3 bg-gray-[#eee] border rounded-lg"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block mb-1 text-sm font-semibold"
                >
                  {t("product_list_form_category")}
                </label>
                <select
                  id="category"
                  className="w-full p-3 bg-gray-[#eee] border rounded-lg"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">
                    {t("product_list_form_select_category")}
                  </option>
                  {categories?.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button type="submit" className="button">
              {t("send_button")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
