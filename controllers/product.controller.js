import cloudinary from "cloudinary";

import asyncHandler from "../services/asyncHandler.js";
import CustomError from "../services/errorHandler.js";
import Product from "../models/product.schema.js";

export const createProduct = asyncHandler(async (req, res) => {
  // Extract data from body
  const { name, price, description, stock, category } = req.body;
  if (!req.files?.photos) throw new CustomError("Images must be required", 400);
  // Extract data from files
  const { photos } = req.files;
  // Check if any fileds is missing or not
  if (!(name && price && description && stock && category))
    throw new CustomError("All fields are required", 400);

  // Minimum two images are required
  if (photos.length === undefined)
    throw new CustomError("Provite at least 2 images of the Product");

  const images = [];
  // Check eatch of the image size. And image size must be under 2 mb
  for (const file of photos) {
    if (!(file.size <= 2 * 1024 * 1024)) {
      throw new CustomError("File size must be at under 2 MB");
    }
  }

  // After upload images store the upload result inside the empty images array
  for (const file of photos) {
    let result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
      folder: "cack_order/products",
    });
    images.push({
      public_id: result.public_id,
      secure_url: result.secure_url,
      imageData: {
        imageType: file.mimetype,
        imageName: file.name,
        imageSize: file.size,
      },
    });
  }

  // Extract all data
  const data = {
    name,
    price,
    description,
    stock,
    category,
    user: req.auth._id,
    photos: images,
  };

  const product = await Product.create(data);
  return res.status(200).json({
    success: true,
    product,
  });
});

export const updateProduct = asyncHandler(async (req, res) => {
  // Extract data from body
  const { name, price, description, stock, category } = req.body;

  let product = req.product;
  let images = [];

  let data = {
    name,
    price,
    description,
    stock,
    category,
  };

  if (req.files) {
    const { photos } = req.files;
    // Check file size under 2 MB
    for (const file of photos) {
      if (!(file.size <= 2 * 1024 * 1024)) {
        throw new CustomError("File size must be at under 2 MB");
      }
    }

    for (const file of product.photos) {
      console.log(file.public_id);
      await cloudinary.v2.uploader.destroy(file.public_id);
    }

    // After upload images store the upload result inside the empty images array
    for (const file of photos) {
      let result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
        folder: "cack_order/products",
      });
      images.push({
        public_id: result.public_id,
        secure_url: result.secure_url,
        imageData: {
          imageType: file.mimetype,
          imageName: file.name,
          imageSize: file.size,
        },
      });
    }

    data.photos = images;
  }

  const updateProduct = await Product.findByIdAndUpdate(req.product._id, data, {
    new: true,
  });

  return res.status(200).json({
    success: true,
    updateProduct,
  });
});

export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  return res.status(200).json({
    success: true,
    products,
  });
});

export const getProduct = asyncHandler(async (req, res) => {
  const product = req.product;
  return res.status(200).json({
    success: true,
    product,
  });
});

export const removeProduct = asyncHandler(async (req, res) => {
  const product = req.product;

  for (const file of product.photos) {
    await cloudinary.v2.uploader.destroy(file.public_id);
  }

  await product.remove();
  return res.status(200).json({
    success: true,
    message: "Product removed successfully",
  });
});
