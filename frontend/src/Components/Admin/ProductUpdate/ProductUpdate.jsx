import { useState, useEffect } from "react";
import AdminMenu from "../AdminMenu/AdminMenu";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteProductMutation,
  useUpdateProductMutation, // Mutation for updating product
  useGetProductByIdQuery,
} from "../../../Redux/Api/productApiSlice";
import { useFetchCategoriesQuery } from "../../../Redux/Api/categoryApiSlice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const ProductUpdate = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const params = useParams();
  const { data: productData } = useGetProductByIdQuery(params.id);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionAr, setDescriptionAr] = useState(""); // New state for Arabic description
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState("");

  const { data: categories = [] } = useFetchCategoriesQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation(); // Add mutation for updating product

  // Populate the state once product data is available
  useEffect(() => {
    if (productData) {
      setName(productData.name || "");
      setDescription(productData.description || "");
      setDescriptionAr(productData.descriptionAr || ""); // Populate Arabic description
      setPrice(productData.price || "");
      setCategory(productData.category?.id || "");
      setQuantity(productData.quantity || "");
      setBrand(productData.brand || "");
      setStock(productData.countInStock || "");
    }
  }, [productData]);

  const handleDelete = async () => {
    try {
      let answer = window.confirm(`${t("are_you_sure")}`);
      if (!answer) return;

      const { data } = await deleteProduct(params.id);
      toast.success(`"${data.name}" has been deleted`, {});
      window.location.href = "/admin/Tous-les-produits";
    } catch (err) {
      console.error(err);
      toast.error("Delete failed. Try again.", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !price) {
      toast.error("Please fill all required fields", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }

    try {
      const updatedProduct = {
        name,
        description,
        descriptionAr,
        price,
        category,
        quantity,
        brand,
        stock,
      };

      // Make sure to log the response here
      const response = await updateProduct({ id: params.id, updatedProduct });
      console.log("Updated product response:", response);

      toast.success("Product updated successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
      navigate("/admin/Tous-les-produits");
    } catch (err) {
      console.error("Error updating product:", err);
      toast.error("Error updating product. Try again.", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <div className="container mx-auto xl:mx-[9rem] p-3">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="p-3 md:w-3/4">
          <h1 className="my-8 md:my-16"> {t("update_delete_product")}</h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block mb-1">{t("form_name")}</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)} // Handle input changes
                  className="w-full p-3 border rounded-lg bg-[#eee]"
                />
              </div>
              <div>
                <label className="block mb-1">
                  {t("product_list_form_price")}
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)} // Handle input changes
                  className="w-full p-3 border rounded-lg bg-[#eee]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block mb-1">
                  {t("product_list_form_quantity")}
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)} // Handle input changes
                  className="w-full p-3 border rounded-lg bg-[#eee]"
                />
              </div>
              <div>
                <label className="block mb-1">
                  {t("product_list_form_brand")}
                </label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)} // Handle input changes
                  className="w-full p-3 border rounded-lg bg-[#eee]"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1">
                {t("product_list_form_description")}
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)} // Handle input changes
                className="w-full p-3 border rounded-lg bg-[#eee]"
              />
            </div>

            <div>
              <label className="block mb-1">
                {t("product_list_form_description_ar")}
              </label>
              <textarea
                value={descriptionAr}
                onChange={(e) => setDescriptionAr(e.target.value)} // Handle input changes
                className="w-full p-3 border rounded-lg bg-[#eee]"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="block mb-1">
                  {t("product_list_form_count_in_stock")}
                </label>
                <input
                  type="number"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)} // Handle input changes
                  className="w-full p-3 border rounded-lg bg-[#eee]"
                />
              </div>
              <div>
                <label className="block mb-1">
                  {t("product_list_form_category")}
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)} // Handle input changes
                  className="w-full p-3 border rounded-lg bg-[#eee]"
                >
                  <option value="">
                    {t("product_list_form_select_category")}
                  </option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="submit"
                className="w-full font-bold rounded-lg button !bg-blue-500"
              >
                {t("update_button")}
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="w-full font-bold rounded-lg button !bg-red"
              >
                {t("delete_button")}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
