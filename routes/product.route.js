import express from "express";
const router = express.Router();

import {
  createProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import {
  findUserById,
  isAdmin,
  isAuthenticate,
  isSignin,
} from "../middlewares/auth.middleware.js";
import { findProductById } from "../middlewares/product.middleware.js";

router.param("userId", findUserById);
router.param("productId", findProductById);

router.post(
  "/product/create/:userId",
  isSignin,
  isAuthenticate,
  isAdmin,
  createProduct
);

router.put(
  "/product/update/:userId/:productId",
  isSignin,
  isAuthenticate,
  isAdmin,
  updateProduct
);

export default router;
