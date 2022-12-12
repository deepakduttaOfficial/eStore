import jwt from "jsonwebtoken";

import envConfig from "../config/env.config.js";
import User from "../models/user.shema.js";
import asyncHandler from "../services/asyncHandler.js";
import CustomError from "../services/errorHandler.js";

export const isSignin = asyncHandler(async (req, _res, next) => {
  const token =
    req.headers?.authorization.replace("Bearer ", "") ||
    req.headers?.cookie?.replace("sign_in=", "") ||
    req.body.token;

  const verify = jwt.verify(token, envConfig.JWT_SECRET_AUTH);
  req.auth = verify;
  next();
});

export const isAuthenticate = asyncHandler(async (req, _res, next) => {
  if (!req.user._id.equals(req.auth._id))
    throw new CustomError("You are not authenticate", 400);

  next();
});

export const findUserById = async (req, _res, next, id) => {
  try {
    const user = await User.findById(id);
    if (!user) throw new CustomError("Invalid User", 400);
    user.password = undefined;
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};

export const isAdmin = asyncHandler(async (req, _res, next) => {
  if (!(req.user.role === "ADMIN" && req.auth.role === "ADMIN"))
    throw new CustomError("You are not Admin", 400);
  next();
});
