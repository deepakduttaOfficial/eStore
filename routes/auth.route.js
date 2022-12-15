import express from "express";
const router = express.Router();

import {
  recoverPassword,
  resetPassword,
  signin,
  signup,
  updatePassword,
  updateProfile,
} from "../controllers/auth.controller.js";
import {
  findUserById,
  isAuthenticate,
  isSignin,
} from "../middlewares/auth.middleware.js";

router.param("userId", findUserById);

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/recover/password", recoverPassword);
router.post("/resetPassword/password", resetPassword);

router.put("/user/update/:userId", isSignin, isAuthenticate, updateProfile);
router.put(
  "/user/update/password/:userId",
  isSignin,
  isAuthenticate,
  updatePassword
);

export default router;
