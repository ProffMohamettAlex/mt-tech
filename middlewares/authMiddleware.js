import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401);
      return next(new Error("Not authorized, please login to continue"));
    }
    // verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    // get user id from token
    const user = await User.findById(verified.id).select("-password");
    if (!user) {
      res.status(404);
      return next(new Error("User not found"));
    }

    if (user.role === "suspended") {
      res.status(400);
      return next(new Error("User suspended, please contact support"));
    }
    req.user = user;
    return next();
  } catch (error) {
    res.status(401);
    return next(new Error("Not authorized, please login to continue"));
  }
});
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401);
    return next(new Error("Not authorized as an admin"));
  }
};

export { protect, adminOnly };
