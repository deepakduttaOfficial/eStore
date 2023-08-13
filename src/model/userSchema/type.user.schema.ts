import { Document } from "mongoose";
import AuthRoles from "../../utils/authRoles.utils";
import { UploadApiResponse } from "cloudinary";

export interface UserInterface {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isActive?: boolean;
  isVerified?: boolean;
  verifyToken?: string;
  loginCount?: number;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  profilePhoto?: UploadApiResponse;
  role: AuthRoles;
  googleData: object;
  googleId: string;
  totalContact?: number;
  virtualNumber: number;
  phone?: number;
}

export interface UserDocument extends UserInterface, Document {
  fullName: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(providedPassword: string): Promise<string>;
  authJwtToken(tokenData?: object): string;
  generateResetPasswordToken(): string;
}
