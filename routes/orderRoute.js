import {
  createOrder,
  getOrder,
  getOrders,
  payWithStripe,
  updateOrderStatus,
  verifyFlwPayment,
} from "../controllers/orderController.js";

import express from "express";
const router = express.Router();
import { adminOnly, protect } from "../middlewares/authMiddleware.js";
// Routes
router.get("/response", verifyFlwPayment);
router.post("/", protect, createOrder);
router.patch("/:id", protect, adminOnly, updateOrderStatus);
router.get("/", protect, getOrders);
router.get("/:id", protect, getOrder);

router.post("/create-payment-intent", payWithStripe);

export default router;
