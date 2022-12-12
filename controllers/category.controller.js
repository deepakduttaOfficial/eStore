import asyncHandler from "../services/asyncHandler.js";
import CustomError from "../services/errorHandler.js";
import Category from "../models/category.schema.js";

export const createCategory = asyncHandler(async (req, res) => {
  // Extact data from body
  const { name } = req.body;
  if (!name) throw new CustomError("Category name is required", 400);

  const date = {
    name,
    user: req.user._id,
  };
  const category = await Category.create(date);

  res.status(200).json({
    success: true,
    category,
  });
});

export const updateCategory = asyncHandler(async (req, res) => {
  // Extact data from body
  const { name } = req.body;
  if (!name) throw new CustomError("Category name is required", 400);
  const category = await Category.findByIdAndUpdate(
    req.category?._id,
    { name },
    {
      new: true,
    }
  );
  // console.log(category);
  res.status(200).json({
    success: true,
    category,
  });
});
