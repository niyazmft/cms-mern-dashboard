import express from "express";
import {
  getProducts,
  updateProduct,
  updateProducts,
  getProductById,
  createProduct,
  deleteProduct,
} from "../controllers/product.js";

const router = express.Router();

router.get("/products", getProducts);
router.post("/products", createProduct);
router.get("/products/:productId", getProductById);
router.put("/update-all", updateProducts);
router.put("/products/:productId", updateProduct);
router.delete("/products/:productId", deleteProduct);

export default router;
