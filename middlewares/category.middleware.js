import Category from "../models/category.schema.js";
export const findCategoryById = async (req, _res, next, id) => {
  try {
    const category = await Category.findById(id);
    if (!category)
      throw new CustomError("This Category is no longer existed", 400);

    req.category = category;
    next();
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
};
