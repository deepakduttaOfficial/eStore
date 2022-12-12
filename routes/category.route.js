import express from "express";
const router = express.Router();

import {
  createCategory,
  getAllCategory,
  getSingleCategory,
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

router.get("/category/get/:categoryId", getSingleCategory);
router.get("/category/get", getAllCategory);

export default router;
