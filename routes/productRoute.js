import express from "express";
import { adminOnly, protect } from "../middlewares/authMiddleware.js";
import {
  createProduct,
  deleteProduct,
  deleteReview,
  getProduct,
  getProducts,
  reviewProduct,
  updateProduct,
  updateReview,
} from "../controllers/productController.js";
const router = express.Router();

router.post("/", protect, adminOnly, createProduct);
router.get("/", getProducts);
router.get("/:id", getProduct);
router.delete("/:id", protect, adminOnly, deleteProduct);
router.patch("/:id", protect, adminOnly, updateProduct);

router.patch("/review/:id", protect, reviewProduct);
router.patch("/deleteReview/:id", protect, deleteReview);
router.patch("/updateReview/:id", protect, updateReview);
export default router;
