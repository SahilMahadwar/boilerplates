import { lucia } from "../configs/lucia.config";
import { asyncHandler } from "../middlewares/async-handler.middleware";
import { Session } from "../models/session.model";
import { User } from "../models/user.model";
import {
  createSession,
  generateAndSendOtp,
  validateOTP,
} from "../services/auth.service";
import { ErrorResponse } from "../utils/error-response.util";
import { getIp } from "../utils/ip-util";

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

  // Create session
  const session = await createSession({
    ip: getIp(req),
    rawUa: req.headers["user-agent"] as string,
    userId: user._id as string,
  });

  if (!session) {
    return next(
      new ErrorResponse({
        message: "Failed to create session",
        statusCode: 400,
      })
    );
  }

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
  const transformedUser = res.locals.dbUser!.transform();

  return res.respond({
    statusCode: 200,
    data: { user: transformedUser },
    message: "Fetched logged in user",
  });
});

export const getLoggedInUserSessions = asyncHandler(async (req, res, next) => {
  const sessions = await lucia.getUserSessions(
    res.locals.dbUser!._id as string
  );

  const formattedSessions = sessions.map((session) => {
    return {
      id: session.id,
      ip: session.ip,
      ipInfo: session.ipInfo,
      deviceInfo: session.deviceInfo,
      createdAt: session.createdAt,
      updatedAt: session.updatedAt,
    };
  });

  // Sort to place the current session on top
  formattedSessions.sort((a, b) => {
    if (a.id === res.locals.session!.id) return -1;
    if (b.id === res.locals.session!.id) return 1;
    return 0;
  });

  return res.respond({
    statusCode: 200,
    data: {
      totalSessions: formattedSessions.length,
      sessions: formattedSessions,
    },
    message: "Fetched sessions",
  });
});

export const deleteUserSession = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const session = await Session.findById(id);

  if (!session) {
    return next(
      new ErrorResponse({
        message: "Session not found",
        statusCode: 404,
      })
    );
  }

  if (session.user_id !== res.locals.dbUser!.id.toString()) {
    return next(
      new ErrorResponse({
        message: "Unauthorized",
        statusCode: 500,
      })
    );
  }

  await lucia.invalidateSession(session._id);

  return res.respond({
    statusCode: 200,
    data: {
      sessions: true,
    },
    message: "Session deleted successfully",
  });
});
