import { Request, Response, NextFunction } from "express";
import CustomError from "./CustomErrorHandler";

interface ErrorResponse {
  success: false;
  message: string;
  code?: number;
}

const asyncHandler =
  (fn: Function) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await fn(req, res, next);
    } catch (error: any) {
      console.log(error);
      if (!(error instanceof CustomError)) {
        error = new CustomError(
          error.message || "Internal Server Error",
          error.code || 500,
          { originalError: error.message }
        );
      }
      const statusCode = error.code || 500;
      const errorMessage = error.message || "Internal Server Error";

      const errorResponse: ErrorResponse = {
        success: false,
        message: errorMessage,
        code: statusCode,
      };

      return res.status(statusCode).json(errorResponse);
    }
  };

export default asyncHandler;
