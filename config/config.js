import dotenv from "dotenv";

dotenv.config();
export const PORT = process.env.PORT;
export const dbURL = process.env.DATABASE_URL;
export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
