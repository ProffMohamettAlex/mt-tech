import express from "express";
const router = express.Router();
import { adminOnly, protect } from "../middlewares/authMiddleware.js";
import {
  createBrand,
  getBrands,
  deleteBrand,
} from "../controllers/brandController.js";

// routes
router.post("/createBrand", protect, adminOnly, createBrand);
router.get("/getBrands", protect, adminOnly, getBrands);

router.delete("/:slug", protect, adminOnly, deleteBrand);

export default router;
