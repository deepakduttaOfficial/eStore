import express from "express";
const router = express.Router();

import {
  createCategory,
  updateCategory,
} from "../controllers/category.controller.js";

import {
  findUserById,
  isAdmin,
  isAuthenticate,
  isSignin,
} from "../middlewares/auth.middleware.js";
import { findCategoryById } from "../middlewares/category.middleware.js";

router.param("userId", findUserById);
router.param("categoryId", findCategoryById);

router.post(
  "/category/create/:userId",
  isSignin,
  isAuthenticate,
  isAdmin,
  createCategory
);

router.put(
  "/category/update/:userId/:categoryId",
  isSignin,
  isAuthenticate,
  isAdmin,
  updateCategory
);

export default router;
