import rateLimit from "express-rate-limit";

export const rateLimiterConfig = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 2, // Allow 500 requests per 15 minutes
  message: {
    success: false,
    code: 429,
    message: "Too many requests, please try again later.",
    err: "Too many requests, please try again later.",
  },
});
