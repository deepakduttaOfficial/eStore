import { Schema, model } from "mongoose";
import { OrderInterface, OrderDocument } from "./type.order.schema";

const orderSchema = new Schema<OrderInterface>(
  {
    shippingInfo: {
      address: {
        type: String,
        required: [true, "Shipping address is required"],
        trim: true,
      },
      city: {
        type: String,
        required: [true, "City is required"],
        trim: true,
      },
      phoneNo: {
        type: String,
        required: [true, "Phone number is required"],
        trim: true,
      },
      postalCode: {
        type: String,
        required: [true, "Postal code is required"],
        trim: true,
      },
      state: {
        type: String,
        required: [true, "State is required"],
        trim: true,
      },
      country: {
        type: String,
        required: [true, "Country is required"],
        trim: true,
      },
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },

    orderItems: [
      {
        quantity: {
          type: Number,
          required: [true, "Quantity is required"],
        },
        price: {
          type: Number,
          required: [true, "Price is required"],
        },
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: [true, "Product ID is required"],
        },
      },
    ],

    paymentInfo: {
      type: Object,
      required: [true, "Tax amount is required"],
    },

    taxAmount: {
      type: Number,
      default: 0,
    },

    shippingAmount: {
      type: Number,
      default: 0,
    },

    totalAmount: {
      type: Number,
      required: [true, "Total amount is required"],
    },

    orderStatus: {
      type: String,
      required: [true, "Order status is required"],
    },
  },
  { timestamps: true }
);

export default model<OrderDocument>("Order", orderSchema);
