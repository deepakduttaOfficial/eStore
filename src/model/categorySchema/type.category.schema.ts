import { Types, Document } from "mongoose";

export interface CategoryInterface {
  name: string;
  user: Types.ObjectId;
}

export interface CategoryDocument extends CategoryInterface, Document {
  createdAt: Date;
  updatedAt: Date;
}
