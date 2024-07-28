import compression from "compression";
import cors from "cors";
import express, { Express } from "express";
import helmet from "helmet";
import morgan from "morgan";
import { connectDB } from "./configs/db.config";
import { rateLimiterConfig } from "./configs/rate-limiter.config";
import { csrfValidation } from "./middlewares/csrf.middleware";
import { errorHandler } from "./middlewares/error-handler.middleware";
import { luciaSession } from "./middlewares/lucia.middleware";
import { responseHandler } from "./middlewares/response-handler.middleware";
import { routes } from "./routes";
import { env } from "./utils/env.util";
import { ErrorResponse } from "./utils/error-response.util";
import { logger } from "./utils/logger.util";

const app: Express = express();

// Connect to db
connectDB();

// Security middleware
app.use(helmet());

// Enable CORS
app.use(
  cors({
    credentials: true,
    origin: true,
    // origin: ['https://domain.com'],
  })
);

// Production specific middleware
if (env.NODE_ENV === "production") {
  // Rate limiting
  app.use(rateLimiterConfig);

  // Lucia csrf validation
  app.use(csrfValidation);
}

// Enable compression
app.use(compression());

// Parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Lucia session middleware
app.use(luciaSession);

// Request logging middleware
if (env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("short"));
}

// Custom response handler middleware
app.use(responseHandler);

// Mount routes
app.use("/api", routes);

// 404 route
app.use((req, res, next) => {
  return next(
    new ErrorResponse({ message: "Route not found", statusCode: 404 })
  );
});

// Error handling middleware
app.use(errorHandler);

const PORT = env.PORT;

const server = app.listen(PORT, () => {
  logger.info(
    `🚀[server]: Server is running in ${env.NODE_ENV} at http://localhost:${PORT}`
  );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: Error) => {
  logger.error(`Unhandled Rejection: ${err.message}`);

  // Close server and exit process
  server.close(() => process.exit(1));
});
