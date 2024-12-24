// import { useState, useEffect } from "react";
// import AdminMenu from "../AdminMenu/AdminMenu";
// import { useNavigate, useParams } from "react-router-dom";
// import {
//   useDeleteProductMutation,
//   useUpdateProductMutation, // Mutation for updating product
//   useGetProductByIdQuery,
// } from "../../../Redux/Api/productApiSlice";
// import { useFetchCategoriesQuery } from "../../../Redux/Api/categoryApiSlice";
// import { toast } from "react-toastify";
// import { useTranslation } from "react-i18next";

// const ProductUpdate = () => {
//   const navigate = useNavigate();
//   const { t } = useTranslation();

//   const params = useParams();
//   const { data: productData } = useGetProductByIdQuery(params.id);

//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [description_ar, setdescription_ar] = useState(""); // New state for Arabic description
//   const [price, setPrice] = useState("");
//   const [category, setCategory] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [brand, setBrand] = useState("");
//   const [stock, setStock] = useState("");
//   const [imageOne, setImageOne] = useState(null);
//   const [imageTwo, setImageTwo] = useState(null);
//   const [imageThree, setImageThree] = useState(null);
//   const [imageFour, setImageFour] = useState(null);

//   const { data: categories = [] } = useFetchCategoriesQuery();
//   const [deleteProduct] = useDeleteProductMutation();
//   const [updateProduct] = useUpdateProductMutation(); // Add mutation for updating product

//   // Populate the state once product data is available
//   useEffect(() => {
//     if (productData) {
//       setName(productData.name || "");
//       setDescription(productData.description || "");
//       setdescription_ar(productData.description_ar || ""); // Populate Arabic description
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
//       toast.success(`"${data.name}" has been deleted`, {});
//       window.location.href = "/admin/Tous-les-produits";
//     } catch (err) {
//       console.error(err);
//       toast.error("Delete failed. Try again.", {
//         position: "top-right",
//         autoClose: 2000,
//       });
//     }
//   };

//   const handleFileChange = (e, setImage) => {
//     const file = e.target.files[0];
//     if (file) setImage(file);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!name || !description || !price) {
//       toast.error("Please fill all required fields", {
//         position: "top-right",
//         autoClose: 2000,
//       });
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("description", description);
//       formData.append("description_ar", description_ar);
//       formData.append("price", price);
//       formData.append("category", category);
//       formData.append("quantity", quantity);
//       formData.append("brand", brand);
//       formData.append("stock", stock);

//       // Append images (assuming image fields are input elements in your form)
//       if (imageOne) formData.append("image_one", imageOne);
//       if (imageTwo) formData.append("image_two", imageTwo);
//       if (imageThree) formData.append("image_three", imageThree);
//       if (imageFour) formData.append("image_four", imageFour);

//       const response = await updateProduct({ id: params.id, formData });

//       console.log("Updated product response:", response);
//       toast.success("Product updated successfully!", {
//         position: "top-right",
//         autoClose: 2000,
//       });
//       navigate("/admin/Tous-les-produits");
//     } catch (err) {
//       console.error("Error updating product:", err);
//       toast.error("Error updating product. Try again.", {
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

//           <form className="space-y-4" onSubmit={handleSubmit}>
//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//               <div>
//                 <input
//                   type="file"
//                   onChange={(e) => handleFileChange(e, setImageOne)}
//                 />
//                 <input
//                   type="file"
//                   onChange={(e) => handleFileChange(e, setImageTwo)}
//                 />
//                 <input
//                   type="file"
//                   onChange={(e) => handleFileChange(e, setImageThree)}
//                 />
//                 <input
//                   type="file"
//                   onChange={(e) => handleFileChange(e, setImageFour)}
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1">{t("form_name")}</label>
//                 <input
//                   type="text"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)} // Handle input changes
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
//                   onChange={(e) => setPrice(e.target.value)} // Handle input changes
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
//                   onChange={(e) => setQuantity(e.target.value)} // Handle input changes
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
//                   onChange={(e) => setBrand(e.target.value)} // Handle input changes
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
//                 onChange={(e) => setDescription(e.target.value)} // Handle input changes
//                 className="w-full p-3 border rounded-lg bg-[#eee]"
//               />
//             </div>

//             <div>
//               <label className="block mb-1">
//                 {t("product_list_form_description_ar")}
//               </label>
//               <textarea
//                 value={description_ar}
//                 onChange={(e) => setdescription_ar(e.target.value)} // Handle input changes
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
//                   onChange={(e) => setStock(e.target.value)} // Handle input changes
//                   className="w-full p-3 border rounded-lg bg-[#eee]"
//                 />
//               </div>
//               <div>
//                 <label className="block mb-1">
//                   {t("product_list_form_category")}
//                 </label>
//                 <select
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)} // Handle input changes
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
//                 type="submit"
//                 className="w-full font-bold rounded-lg button !bg-blue-500"
//               >
//                 {t("update_button")}
//               </button>
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
import AdminMenu from "../AdminMenu/AdminMenu";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteProductMutation,
  useUpdateProductMutation,
  useGetProductByIdQuery,
} from "../../../Redux/Api/productApiSlice";
import { useFetchCategoriesQuery } from "../../../Redux/Api/categoryApiSlice";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const ProductUpdate = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const params = useParams();
  const { data: productData, refetch } = useGetProductByIdQuery(params.id); // Add refetch to get updated data

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    description_ar: "",
    price: "",
    category: "",
    quantity: "",
    brand: "",
    stock: "",
  });

  const { data: categories = [] } = useFetchCategoriesQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  // Populate the state once product data is available
  useEffect(() => {
    if (productData) {
      setFormData({
        name: productData.name || "",
        description: productData.description || "",
        description_ar: productData.description_ar || "",
        price: productData.price || "",
        category: productData.category?._id || "",
        quantity: productData.quantity || "",
        brand: productData.brand || "",
        stock: productData.countInStock || "",
      });
    }
  }, [productData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = async () => {
    try {
      let answer = window.confirm(`${t("are_you_sure")}`);
      if (!answer) return;

      const { data } = await deleteProduct(params.id);
      toast.success(`"${data.name}" has been deleted`);
      navigate("/admin/Tous-les-produits"); // Redirect to the products page
    } catch (err) {
      console.error(err);
      toast.error("Delete failed. Try again.");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted!");

    // Log the form data to ensure it's being updated
    console.log("Form data: ", formData);

    const { name, description, price } = formData;

    // Check for missing fields
    if (!name || !description || !price) {
      toast.error("Please fill all required fields");
      return;
    }

    // Ensure that the category is the ObjectId
    const updatedProductData = new FormData();
    updatedProductData.append("name", formData.name);
    updatedProductData.append("description", formData.description);
    updatedProductData.append("description_ar", formData.description_ar);
    updatedProductData.append("price", formData.price);
    updatedProductData.append("quantity", formData.quantity);
    updatedProductData.append("brand", formData.brand);
    updatedProductData.append("stock", formData.stock);

    // Make sure category is the ObjectId, not the name
    updatedProductData.append("category", formData.category); // Make sure this is the ObjectId

    // If you have image fields, append them as well
    // Example: updatedProductData.append("image", selectedImageFile);

    try {
      // Update the product using the updated data
      const response = await updateProduct({
        productId: params.id,
        formData: updatedProductData,
      }).unwrap(); // Use unwrap for better error handling

      console.log("Updated product response:", response);
      toast.success("Product updated successfully!");

      // Refetch the data to ensure the updated data is available
      await refetch();

      navigate("/admin/Tous-les-produits"); // Redirect to the products page after the update
    } catch (err) {
      console.error("Update error:", err);
      toast.error(err?.data?.message || "Error updating product. Try again.");
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
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg bg-[#eee]"
                />
              </div>
              <div>
                <label className="block mb-1">
                  {t("product_list_form_price")}
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
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
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg bg-[#eee]"
                />
              </div>
              <div>
                <label className="block mb-1">
                  {t("product_list_form_brand")}
                </label>
                <input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg bg-[#eee]"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1">
                {t("product_list_form_description")}
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg bg-[#eee]"
              />
            </div>

            <div>
              <label className="block mb-1">
                {t("product_list_form_description_ar")}
              </label>
              <textarea
                name="description_ar"
                value={formData.description_ar}
                onChange={handleChange}
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
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg bg-[#eee]"
                />
              </div>
              <div>
                <label className="block mb-1">
                  {t("product_list_form_category")}
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg bg-[#eee]"
                >
                  <option value="">
                    {t("product_list_form_select_category")}
                  </option>
                  {categories.map((c) => (
                    <option key={c._id} value={c._id}>
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
