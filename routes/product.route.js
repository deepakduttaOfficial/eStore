import express from "express";
const router = express.Router();

import {
  createProduct,
  getProduct,
  getProducts,
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

router.get("/product/get", getProducts);
router.get("/product/get/:productId", getProduct);

export default router;
