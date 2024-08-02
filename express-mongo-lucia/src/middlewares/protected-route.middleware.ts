import { NextFunction, Request, Response } from "express";
import { roles } from "../constants/auth.constants";
import { ErrorResponse } from "../utils/error-response.util";

export const protectedRoute = (requiredRoles: string[] = []) => {
  return (req: Request, res: Response, next: NextFunction): Response | void => {
    if (!res.locals.dbUser || !res.locals.session) {
      return next(
        new ErrorResponse({
          message: "Unauthenticated",
          statusCode: 401,
        })
      );
    }

    // Check for required roles
    if (requiredRoles.length > 0) {
      const userRoles: string[] = res.locals.dbUser.roles;

      const isAdmin = userRoles.includes(roles.admin);

      if (isAdmin) {
        return next();
      }

      const hasRequiredRole = requiredRoles.some((role) =>
        userRoles.includes(role)
      );

      if (!hasRequiredRole) {
        return next(
          new ErrorResponse({
            message: "Forbidden",
            statusCode: 403,
          })
        );
      }
    }

    next();
  };
};

export default protectedRoute;
