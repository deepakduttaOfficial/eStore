import express from "express";
const router = express.Router();
import {
  createOrder,
  userGetOrder,
  userGetOrders,
} from "../controllers/order.controller.js";

import {
  findUserById,
  isAuthenticate,
  isSignin,
} from "../middlewares/auth.middleware.js";
import {
  amoutChecker,
  checkOrderField,
  findOrderById,
  isProductAvailable,
  isValidateProducts,
} from "../middlewares/order.middleware.js";

router.param("userId", findUserById);
router.param("orderId", findOrderById);

router.post(
  "/order/create/:userId",
  isSignin,
  isAuthenticate,
  checkOrderField,
  isValidateProducts,
  isProductAvailable,
  amoutChecker,
  createOrder
);

router.get(
  "/order/get/:userId/:orderId",
  isSignin,
  isAuthenticate,
  userGetOrder
);
router.get("/order/get/:userId", isSignin, isAuthenticate, userGetOrders);

export default router;
