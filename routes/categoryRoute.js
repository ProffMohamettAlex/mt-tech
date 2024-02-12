import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
} from "../controllers/categoryController.js";
import { adminOnly, protect } from "../middlewares/authMiddleware.js";
const router = express.Router();

// routes
router.post("/createCategory", protect, adminOnly, createCategory);
router.get("/getCategories", protect, adminOnly, getCategories);
router.delete("/:slug", protect, adminOnly, deleteCategory);

export default router;
