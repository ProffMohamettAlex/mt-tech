import Stripe from "stripe";
import { STRIPE_SECRET_KEY } from "../config/config.js";
import Product from "../models/productModel.js";

// Instantiate stripe
// const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
const stripe = Stripe(STRIPE_SECRET_KEY);
// Calculate Total Price
function calculateTotalPrice(products, cartItems) {
  let totalPrice = 0;

  cartItems.forEach(function (cartItem) {
    const product = products.find(function (product) {
      return product._id?.toString() === cartItem._id;
    });

    if (product) {
      const quantity = cartItem.cartQuantity;
      const price = parseFloat(product.price);
      totalPrice += quantity * price;
    }
  });

  return totalPrice * 100;
}

const updateProductQuantity = async (cartItems) => {
  let bulkOption = cartItems.map((product) => {
    return {
      updateOne: {
        filter: { _id: product._id },
        update: {
          $inc: {
            quantity: -product.cartQuantity,
            sold: +product.cartQuantity,
          },
        },
      },
    };
  });
  await Product.bulkWrite(bulkOption, {});
};
export { stripe, calculateTotalPrice, updateProductQuantity };
