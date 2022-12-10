import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Provide product name"],
      trim: true,
      maxlength: [120, "Product name should not be more than 120 characters"],
    },

    price: {
      type: Number,
      required: [true, "please provide product price"],
      maxlength: [10, "Product price should not be more than 10 digits"],
    },

    description: {
      type: String,
      trim: true,
      required: [true, "Provide product description"],
    },

    stock: {
      type: Number,
      required: [true, "Enter how many stock you have.."],
    },

    sold: {
      type: Number,
      default: 0,
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      require: [true, "Choose a category"],
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    photos: [
      {
        public_id: {
          type: String,
          required: true,
        },
        secure_url: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
