import express from "express";
const router = express.Router();
import { protect, adminOnly } from "../middlewares/authMiddleware.js";
import {
  createCoupon,
  getCoupons,
  getCoupon,
  deleteCoupon,
} from "../controllers/couponController.js";

// routes
router.post("/createCoupon", protect, adminOnly, createCoupon);
router.get("/getCoupons", protect, adminOnly, getCoupons);
router.get("/:couponName", protect, getCoupon);
router.delete("/:id", protect, adminOnly, deleteCoupon);

export default router;
