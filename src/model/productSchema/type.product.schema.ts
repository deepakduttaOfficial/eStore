import { UploadApiResponse } from "cloudinary"
import { Types } from "mongoose"
import Size from "../../utils/size.utils";

export interface ProductInterface {
  name: string;
  price: number;
  description: string;
  stock: number;
  sold: number;
  category: Types.ObjectId;
  user: Types.ObjectId;
  images: UploadApiResponse;
  sizes: Size[]
  keyword?: string[]
  isCashOnDelivery: boolean
  deliveryCharge: number
}
