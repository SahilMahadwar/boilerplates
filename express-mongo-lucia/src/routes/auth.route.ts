import express from "express";
import { validate } from "express-validation";

import {
  deleteUserSession,
  generateOtp,
  getLoggedInUser,
  getLoggedInUserSessions,
  otpLogin,
} from "../controllers/auth.controller";
import protectedRoute from "../middlewares/protected-route.middleware";
import { authValidations } from "../validations/auth.validation";

export const authRouter = express.Router();

authRouter
  .route("/generate-otp")
  .post(validate(authValidations.generateOtp), generateOtp);

authRouter
  .route("/login/otp")
  .post(validate(authValidations.otpLogin), otpLogin);

authRouter.route("/current-user").get(protectedRoute(), getLoggedInUser);

authRouter
  .route("/current-user/sessions")
  .get(protectedRoute(), getLoggedInUserSessions);
authRouter
  .route("/current-user/sessions/:id")
  .delete(
    validate(authValidations.deleteUserSession),
    protectedRoute(),
    deleteUserSession
  );

// authRouter.route("/login/github").post(otpLogin);
// authRouter.route("/login/github/callback").post(otpLogin);
