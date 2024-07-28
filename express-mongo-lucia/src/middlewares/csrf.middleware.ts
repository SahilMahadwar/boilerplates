import { NextFunction, Request, Response } from "express";
import { verifyRequestOrigin } from "lucia";
import { ErrorResponse } from "../utils/error-response.util";

export const csrfValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.method === "GET") {
    return next();
  }

  const originHeader = req.headers.origin ?? null;

  const hostHeader = req.headers.host ?? null;

  if (
    !originHeader ||
    !hostHeader ||
    !verifyRequestOrigin(originHeader, [hostHeader])
  ) {
    return next(
      new ErrorResponse({ message: "CSRF validation failed", statusCode: 403 })
    );
  }
};
