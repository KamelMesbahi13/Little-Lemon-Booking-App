// import { useState, useEffect } from "react";
// import AdminMenu from "../AdminMenu/AdminMenu";
// import { useParams } from "react-router-dom";
// import {
//   useDeleteProductMutation,
//   useGetProductByIdQuery,
// } from "../../../Redux/Api/productApiSlice";
// import { useFetchCategoriesQuery } from "../../../Redux/Api/categoryApiSlice";
// import { toast } from "react-toastify";
// import { useTranslation } from "react-i18next";

// const ProductUpdate = () => {
//   const { t } = useTranslation();

//   const params = useParams();
//   const { data: productData } = useGetProductByIdQuery(params.id);

//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [category, setCategory] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [brand, setBrand] = useState("");
//   const [stock, setStock] = useState("");

//   const { data: categories = [] } = useFetchCategoriesQuery();
//   const [deleteProduct] = useDeleteProductMutation();

//   // Populate the state once product data is available
//   useEffect(() => {
//     if (productData) {
//       setName(productData.name || "");
//       setDescription(productData.description || "");
//       setPrice(productData.price || "");
//       setCategory(productData.category?.id || "");
//       setQuantity(productData.quantity || "");
//       setBrand(productData.brand || "");
//       setStock(productData.countInStock || "");
//     }
//   }, [productData]);

//   const handleDelete = async () => {
//     try {
//       let answer = window.confirm(`${t("are_you_sure")}`);
//       if (!answer) return;

//       const { data } = await deleteProduct(params.id);
//       toast.success(`"${data.name}" has been deleted`, {
//         position: "top-right",
//         autoClose: 2000,
//       });
//       window.location.href = "/admin/Tous-les-produits";
//     } catch (err) {
//       console.error(err);
//       toast.error("Delete failed. Try again.", {
//         position: "top-right",
//         autoClose: 2000,
//       });
//     }
//   };

//   return (
//     <div className="container mx-auto xl:mx-[9rem] p-3">
//       <div className="flex flex-col md:flex-row">
//         <AdminMenu />
//         <div className="p-3 md:w-3/4">
//           <h1 className="my-8 md:my-16"> {t("update_delete_product")}</h1>

//           <form className="space-y-4">
//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//               <div>
//                 <label className="block mb-1">{t("form_name")}</label>
//                 <input
//                   type="text"
//                   value={name}
//                   readOnly
//                   className="w-full p-3 border rounded-lg bg-[#eee]"
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1">
//                   {t("product_list_form_price")}
//                 </label>
//                 <input
//                   type="number"
//                   value={price}
//                   readOnly
//                   className="w-full p-3 border rounded-lg bg-[#eee]"
//                 />
//               </div>
//             </div>

//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//               <div>
//                 <label className="block mb-1">
//                   {t("product_list_form_quantity")}
//                 </label>
//                 <input
//                   type="number"
//                   value={quantity}
//                   readOnly
//                   className="w-full p-3 border rounded-lg bg-[#eee]"
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1">
//                   {t("product_list_form_brand")}
//                 </label>
//                 <input
//                   type="text"
//                   value={brand}
//                   readOnly
//                   className="w-full p-3 border rounded-lg bg-[#eee]"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block mb-1">
//                 {t("product_list_form_description")}
//               </label>
//               <textarea
//                 value={description}
//                 readOnly
//                 className="w-full p-3 border rounded-lg bg-[#eee]"
//               />
//             </div>

//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//               <div>
//                 <label className="block mb-1">
//                   {t("product_list_form_count_in_stock")}
//                 </label>
//                 <input
//                   type="number"
//                   value={stock}
//                   readOnly
//                   className="w-full p-3 border rounded-lg bg-[#eee]"
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1">
//                   {t("product_list_form_category")}
//                 </label>
//                 <select
//                   value={category}
//                   disabled
//                   className="w-full p-3 border rounded-lg bg-[#eee]"
//                 >
//                   <option value="">
//                     {t("product_list_form_select_category")}
//                   </option>
//                   {categories.map((c) => (
//                     <option key={c.id} value={c.id}>
//                       {c.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <div className="flex space-x-4">
//               <button
//                 type="button"
//                 onClick={handleDelete}
//                 className="w-full font-bold rounded-lg button !bg-red"
//               >
//                 {t("delete_button")}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductUpdate;

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from "../../features/api/productApiSlice";
import { useParams } from "react-router-dom";
import Loader from "../Loader";

const ProductUpdate = () => {
  const { productId } = useParams();
  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductDetailsQuery(productId);
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    descriptionAr: "",
    price: "",
    category: "",
    quantity: "",
    brand: "",
    stock: "",
    imageOne: "",
    imageTwo: "",
    imageThree: "",
    imageFour: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        descriptionAr: product.descriptionAr,
        price: product.price,
        category: product.category,
        quantity: product.quantity,
        brand: product.brand,
        stock: product.stock,
        imageOne: product.image_one,
        imageTwo: product.image_two,
        imageThree: product.image_three,
        imageFour: product.image_four,
      });
    }
  }, [product]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({ productId, ...formData }).unwrap();
      alert("Product updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to update the product.");
    }
  };

  if (isLoading) return <Loader />;
  if (isError) return <div>Error loading product details.</div>;

  return (
    <div className="max-w-4xl p-4 mx-auto">
      <h2 className="mb-4 text-xl font-bold">Update Product</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Product Name"
          className="block w-full p-2 border rounded"
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="block w-full p-2 border rounded"
        />
        <textarea
          name="descriptionAr"
          value={formData.descriptionAr}
          onChange={handleInputChange}
          placeholder="Description (Arabic)"
          className="block w-full p-2 border rounded"
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleInputChange}
          placeholder="Price"
          className="block w-full p-2 border rounded"
        />
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          placeholder="Category"
          className="block w-full p-2 border rounded"
        />
        <input
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleInputChange}
          placeholder="Quantity"
          className="block w-full p-2 border rounded"
        />
        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleInputChange}
          placeholder="Brand"
          className="block w-full p-2 border rounded"
        />
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleInputChange}
          placeholder="Stock"
          className="block w-full p-2 border rounded"
        />
        <button
          type="submit"
          disabled={isUpdating}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          {isUpdating ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
};

ProductUpdate.propTypes = {
  productId: PropTypes.string.isRequired,
};

export default ProductUpdate;
