import { Types, Document } from "mongoose";
import { RazorpayPaymentSuccessResponse } from "../../services/razorpay/type.razorypay.service";
import OrderStatus from "../../utils/orderStatus.utils";

export interface OrderItemsInterface {
  quantity: string;
  price: string;
  productId: Types.ObjectId;
}

export interface ShippingInfoInterface {
  address: string;
  city: string;
  phoneNo: string;
  postalCode: string;
  state: string;
  country: string;
}

export interface OrderInterface {
  shippingInfo: ShippingInfoInterface;
  user: Types.ObjectId;
  orderItems: Types.ArraySubdocument<OrderItemsInterface>;
  paymentInfo: RazorpayPaymentSuccessResponse; // Need to be check
  taxAmount: number;
  shippingAmount: number;
  totalAmount: number;
  orderStatus: OrderStatus;
}

export interface OrderDocument extends OrderInterface, Document {
  createdAt: Date;
  updatedAt: Date;
}
