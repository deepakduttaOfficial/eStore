import express from "express";
const router = express.Router();

import { createCategory } from "../controllers/category.controller.js";
import {
  findUserById,
  isAdmin,
  isAuthenticate,
  isSignin,
} from "../middlewares/auth.middleware.js";

router.param("userId", findUserById);

router.post(
  "/category/create/:userId",
  isSignin,
  isAuthenticate,
  isAdmin,
  createCategory
);

export default router;
