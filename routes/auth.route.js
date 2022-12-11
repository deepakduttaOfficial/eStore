import express from "express";
import {
  recoverPassword,
  resetPassword,
  signin,
  signup,
} from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/recover/password", recoverPassword);
router.post("/resetPassword/password", resetPassword);

export default router;
