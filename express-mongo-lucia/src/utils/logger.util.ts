import { createLogger, format, transports } from "winston";

// Custom format to include the log level
const customFormat = format.combine(
  format.colorize(),
  format.printf(({ level, message }) => {
    if (typeof message === "object") {
      return `${level}: ${JSON.stringify(message, null, 2)}`;
    }
    return `${level}: ${message}`;
  })
);

export const logger = createLogger({
  level: "debug", // Set default level to debug to ensure all levels are captured
  format: customFormat,
  transports: [
    new transports.Console({
      level: "info",
    }),

    // Transport for info level logs
    new transports.File({
      filename: "./logs/application.log",
      level: "info",
    }),

    // Transport for debug level logs
    new transports.File({
      filename: "./logs/debug.log",
      level: "debug",
      format: format.combine(format.timestamp(), customFormat),
    }),

    // Transport for warn level logs
    new transports.File({
      filename: "./logs/warning.log",
      level: "warn",
      format: format.combine(format.timestamp(), customFormat),
    }),

    // Transport for error level logs
    new transports.File({
      filename: "./logs/error.log",
      level: "error",
      format: format.combine(
        format.timestamp(),
        format.errors({ stack: true }),
        customFormat
      ),
    }),
  ],
});
