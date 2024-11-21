import express from "express";
import formidable from "express-formidable";
const router = express.Router();

// controllers
import {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchProductById,
  fetchAllProducts,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts,
  filterProducts,
  getProductsByCategory,
} from "../Controllers/productController.js";
import checkId from "../Middlewares/checkId.js";

router.route("/").get(fetchProducts).post(formidable(), addProduct);

router.route("/Tous-les-produits").get(fetchAllProducts);
router.route("/:id/reviews").post(checkId, addProductReview);

router.get("/top", fetchTopProducts);
router.get("/new", fetchNewProducts);
router.get("/category/:category", getProductsByCategory);

router
  .route("/:id")
  .get(fetchProductById)
  .put(formidable(), updateProductDetails)
  .delete(removeProduct);

router.route("/filtered-products").post(filterProducts);

export default router;
