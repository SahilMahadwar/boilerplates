import { NextFunction, Request, Response } from "express";
import { APIResponse } from "../utils/api-response.util";

export const responseHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.respond = function <T>({
    statusCode,
    data,
    message = "success",
  }: {
    statusCode: number;
    data: T;
    message?: string;
  }) {
    this.status(statusCode).json(new APIResponse<T>(statusCode, data, message));
  };

  return next();
};
