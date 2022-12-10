import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

import User from "../models/user.shema.js";
import asyncHandler from "../services/asyncHandler.js";
import CustomError from "../services/errorHandler.js";
import envConfig from "../config/env.config.js";
import authMailSender from "../services/authMailSender.js";

export const signup = asyncHandler(async (req, res) => {
  // Extact data from body
  const { name, email, password } = req.body;
  if (!(name && email && password)) {
    throw new CustomError("All field are required", 400);
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new CustomError("User already exists", 400);
  }

  const verifyToken = jwt.sign(
    { id: uuidv4() },
    envConfig.EMAIL_VERIFY_TOKEN_SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );

  const data = { name, email, password, verifyToken };

  const user = await User.create(data);

  user.password = undefined;

  const options = { email, name, verifyToken };
  authMailSender(options, req);

  // const token = user.authJwtToken();

  // res.cookie("sign_in", token, {
  //   expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  //   httpOnly: true,
  // });

  res.status(200).json({
    success: true,
    user,
  });
});

export const signin = asyncHandler(async (req, res) => {
  // Extact data from body
  const { email, password } = req.body;
  if (!(email && password)) {
    throw new CustomError("All field are required", 400);
  }
  const user = await User.findOne({ email });

  if (!(user && (await user.comparePassword(password)))) {
    throw new CustomError("Invalid email or password.", 400);
  }

  // Check how many time user is longing our app
  await User.findByIdAndUpdate(
    user._id,
    { $inc: { loginCount: 1 } },
    { new: true }
  );

  user.password = undefined;

  const token = user.authJwtToken();

  res.cookie("sign_in", token, {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    user,
    sign_in: token,
  });
});
