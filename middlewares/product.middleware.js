import Product from "../models/product.schema.js";
import CustomError from "../services/errorHandler.js";

export const findProductById = async (req, _res, next, id) => {
  try {
    const product = await Product.findById(id);
    if (!product) throw new CustomError("Invalid ProductId", 400);
    req.product = product;
    next();
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};
