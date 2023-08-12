import { UploadApiResponse } from "cloudinary";
import { Types, Document } from "mongoose";
import Size from "../../utils/size.utils";

export interface ProductInterface {
  name: string;
  price: number;
  description: string;
  stock: number;
  sold: number;
  category: Types.ObjectId;
  user: Types.ObjectId;
  images: Types.Array<UploadApiResponse>;
  sizes: Types.Array<Size>;
  keyword?: string[];
  isCashOnDelivery: boolean;
  deliveryCharge: number;
}

export interface ProductDocument extends ProductInterface, Document {
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}
