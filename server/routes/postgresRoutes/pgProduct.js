import express from "express";
import {
  getProducts,
  updateProduct,
  updateProducts,
  getProductById,
  createProduct,
  deleteProduct,
} from "../../controllers/postgresController/pgProduct.js";

const router = express.Router();

router.get("/", getProducts);
router.post("/", createProduct);
router.get("/:productId", getProductById);
router.put("/update-all", updateProducts);
router.put("/:productId", updateProduct);
router.delete("/:productId", deleteProduct);

export default router;
