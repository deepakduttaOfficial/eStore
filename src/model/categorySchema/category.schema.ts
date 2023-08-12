import { Schema, model } from "mongoose";
import { CategoryInterface, CategoryDocument } from "./type.category.schema";

const categorySchema = new Schema<CategoryInterface>(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      unique: true,
      trim: true,
      maxLength: [220, "must be under 220 characters"],
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default model<CategoryDocument>("Category", categorySchema);
