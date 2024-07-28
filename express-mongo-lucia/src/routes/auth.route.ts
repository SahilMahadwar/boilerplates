import express from "express";
import { validate } from "express-validation";

import {
  generateOtp,
  getLoggedInUser,
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

authRouter.route("/me").get(protectedRoute(), getLoggedInUser);

// authRouter.route("/login/github").post(otpLogin);
// authRouter.route("/login/github/callback").post(otpLogin);
