import { v4 as uuidv4 } from "uuid";
import asyncHandler from "../services/asyncHandler.js";
import CustomError from "../services/errorHandler.js";
import razorpayPayment from "../services/razorpayPayment.js";
import Order from "../models/order.schema.js";
import Product from "../models/product.schema.js";

export const createOrder = asyncHandler(async (req, res) => {
  const { shippingInfo, orderItems, totalAmount } = req.body;
  const { address, city, phoneNo, postalCode, state } = shippingInfo;

  const paymentInfo = {
    totalAmount: totalAmount, // Don't need to multiply by 100
    notes: shippingInfo,
    receipt: uuidv4(),
  };
  const { id, receipt, status } = await razorpayPayment(paymentInfo);
  const data = {
    shippingInfo: {
      address,
      city,
      phoneNo,
      postalCode,
      state,
    },
    user: req.auth._id,
    orderItems,
    totalAmount,
    paymentInfo: { id, receipt, status },
  };

  const order = await Order.create(data);

  if (!order) throw new CustomError("Order failed. Amout will be refund", 400);

  for (const value of orderItems) {
    await Product.findByIdAndUpdate(value.productId, {
      $inc: { sold: value.quantity, stock: -value.quantity },
    });
  }

  return res.status(200).json({
    success: true,
    order,
  });
});
