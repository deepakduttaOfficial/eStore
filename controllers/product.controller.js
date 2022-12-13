import asyncHandler from "../services/asyncHandler.js";
import CustomError from "../services/errorHandler.js";

export const createProduct = asyncHandler(async (req, res) => {
  const { name, price, description, stock, category } = req.body;
  if (!req.files?.photos) throw new CustomError("Images must be required", 400);
  const { photos } = req.files;
  if (!(name && price && description && stock && category))
    throw new CustomError("All fields are required", 400);

  console.log({
    name,
    price,
    description,
    stock,
    category,
    photos,
  });
});
