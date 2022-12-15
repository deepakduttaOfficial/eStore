import asyncHandler from "../services/asyncHandler.js";
import CustomError from "../services/errorHandler.js";
import Category from "../models/category.schema.js";

export const createCategory = asyncHandler(async (req, res) => {
  // Extact data from body
  const { name } = req.body;
  if (!name) throw new CustomError("Category name is required", 400);

  const existCategory = await Category.findOne({ name });
  if (existCategory) throw new CustomError("This category already exist");
  const date = {
    name,
    user: req.admin._id,
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

export const getSingleCategory = asyncHandler(async (req, res) => {
  // Extact data from body
  const category = req.category;
  // console.log(category);
  res.status(200).json({
    success: true,
    category,
  });
});

export const getAllCategory = asyncHandler(async (req, res) => {
  // Extact data from body
  const categories = await Category.find();

  res.status(200).json({
    success: true,
    categories,
  });
});

export const removeCategory = asyncHandler(async (req, res) => {
  // Extact data from body
  const category = req.category;

  await category.remove();

  res.status(200).json({
    success: true,
    message: `Category removed successfully`,
  });
});
