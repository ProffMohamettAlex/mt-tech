import express from "express";
import {
  addToWishlist,
  changeUserRole,
  clearCart,
  deleteUser,
  forgotPassword,
  getCart,
  getLoginStatus,
  getUser,
  getUsers,
  getWishlist,
  loginUser,
  logoutUser,
  registerUser,
  removeFromWishlist,
  resetPassword,
  saveCart,
  updatePhoto,
  updateUser,
} from "../controllers/userController.js";
import { adminOnly, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/getUser", protect, getUser);
router.get("/getLoginStatus", getLoginStatus);
router.get("/getUsers", protect, adminOnly, getUsers);
router.delete("/:id", protect, adminOnly, deleteUser);
router.post("/changeUserRole", protect, adminOnly, changeUserRole);
router.get("/getLoginStatus", getLoginStatus);
router.patch("/updateUser", protect, updateUser);
router.patch("/updatePhoto", protect, updatePhoto);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resetToken", resetPassword);
// wishlist
router.post("/addToWishlist", protect, addToWishlist);
router.get("/getWishlist", protect, getWishlist);
router.put("/wishlist/:productId", protect, removeFromWishlist);

// cart
router.get("/getCart", protect, getCart);
router.patch("/saveCart", protect, saveCart);
router.patch("/clearCart", protect, clearCart);

export default router;
