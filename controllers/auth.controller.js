import User from "../models/user.shema.js";
import asyncHandler from "../services/asyncHandler.js";
import CustomError from "../services/errorHandler.js";

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

  const data = { name, email, password };

  const user = await User.create(data);

  user.password = undefined;

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
