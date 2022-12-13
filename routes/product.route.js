import express from "express";
const router = express.Router();

import { createProduct } from "../controllers/product.controller.js";
import {
  findUserById,
  isAdmin,
  isAuthenticate,
  isSignin,
} from "../middlewares/auth.middleware.js";

router.param("userId", findUserById);

router.post(
  "/product/create/:userId",
  isSignin,
  isAuthenticate,
  isAdmin,
  createProduct
);

export default router;
