import { Request, Response, NextFunction } from "express";
import CustomError from "./CustomErrorHandler";

interface ErrorResponse {
  success: false;
  message: string;
  code?: number;
}

type ExpressMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

const asyncHandler =
  (fn: ExpressMiddleware) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await fn(req, res, next);
    } catch (error) {
      console.log(error);

      let customError: CustomError;

      if (!(error instanceof CustomError)) {
        const message =
          error instanceof Error ? error.message : "Internal Server Error";
        const code = error instanceof Error ? 500 : 500;
        customError = new CustomError(message, code, {
          originalError: message,
        });
      } else {
        customError = error;
      }

      const statusCode = customError.code || 500;
      const errorMessage = customError.message || "Internal Server Error";

      const errorResponse: ErrorResponse = {
        success: false,
        message: errorMessage,
        code: statusCode,
      };

      return res.status(statusCode).json(errorResponse);
    }
  };

export default asyncHandler;
