import express from "express";
const router = express.Router();
import { createOrder } from "../controllers/order.controller.js";

import {
  findUserById,
  isAuthenticate,
  isSignin,
} from "../middlewares/auth.middleware.js";
import {
  amoutChecker,
  checkOrderField,
  isProductAvailable,
  isValidateProducts,
} from "../middlewares/order.middleware.js";

router.param("userId", findUserById);

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

export default router;
