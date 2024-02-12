import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import brandRoute from "./routes/brandRoute.js";
import couponRoute from "./routes/couponRoute.js";
import orderRoute from "./routes/orderRoute.js";
import transactionRoute from "./routes/transactionRoute.js";
import errorHandler from "./middlewares/errorMiddleware.js";
const app = express();
// middleware
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000", "https://darajotech.vercel.app"],
    credentials: true,
  })
);

app.use("/api/transaction", transactionRoute);
app.use(express.json());
// Routes
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/category", categoryRoute);
app.use("/api/brand", brandRoute);
app.use("/api/coupon", couponRoute);
app.use("/api/order", orderRoute);
app.get("/", (req, res) => {
  res.send("Home Page...");
});

connectDB();
// error middleware
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, (req, res) => {
  console.log(`Server is running at: http://localhost:${PORT}`);
});
