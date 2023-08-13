import { Schema, model } from "mongoose";
import { ProductInterface, ProductDocument } from "./type.product.schema";
import Size from "../../utils/size.utils";

const productSchema = new Schema<ProductInterface>(
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

    images: [{ type: Object }],

    sizes: [
      {
        type: String,
        enum: Object.values(Size),
        require: [true, "Choose a sizes"],
      },
    ],

    keyword: [{ type: String }],

    deliveryCharge: {
      type: Number,
      default: 0,
    },

    isCashOnDelivery: {
      type: Boolean,
      require: [true, "Please select cash on delivery available or not"],
    },
  },
  { timestamps: true }
);

productSchema.virtual("totalPrice").get(function (this: ProductDocument) {
  return this.price + this.deliveryCharge;
});

export default model<ProductDocument>("User", productSchema);
