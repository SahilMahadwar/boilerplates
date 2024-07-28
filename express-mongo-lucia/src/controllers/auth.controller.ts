import { lucia } from "../configs/lucia.config";
import { asyncHandler } from "../middlewares/async-handler.middleware";
import { User } from "../models/user.model";
import { generateAndSendOtp, validateOTP } from "../services/auth.service";
import { ErrorResponse } from "../utils/error-response.util";

// Generate OTP
export const generateOtp = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const generatedOtpInfo = await generateAndSendOtp({
    email: email,
  });

  if (!generatedOtpInfo) {
    return next(
      new ErrorResponse({
        message: "Failed to send OTP email",
        statusCode: 400,
      })
    );
  }

  return res.respond({
    statusCode: 201,
    data: { email: generatedOtpInfo },
    message: "OTP generated and sent successfully",
  });
});

// Login using OTP
export const otpLogin = asyncHandler(async (req, res, next) => {
  const { otp, email } = req.body;

  // Find or create user using email
  let user = await User.findOne({ email: email });

  if (!user) {
    user = await User.create({
      email: email,
    });
  }

  // Validate OTP
  const isValidOTP = await validateOTP({ email: email, otp: otp });

  if (!isValidOTP) {
    return next(
      new ErrorResponse({
        message: "Invalid or expired OTP",
        statusCode: 400,
      })
    );
  }

  const session = await lucia.createSession(user._id as string, {});

  return res
    .appendHeader(
      "Set-Cookie",
      lucia.createSessionCookie(session.id).serialize()
    )
    .respond({
      statusCode: 201,
      data: user,
      message: "User logged in successfully",
    });
});

// Get logged in user
export const getLoggedInUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(res.locals.user._id);

  const transformedUser = user!.transform();

  return res.respond({
    statusCode: 200,
    data: { user: transformedUser },
    message: "Fetched logged in user",
  });
});
