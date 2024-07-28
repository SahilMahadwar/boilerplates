import nodemailer from "nodemailer";
import { env } from "../utils/env.util";
import { logger } from "../utils/logger.util";

export const mailHogTransporter = nodemailer.createTransport({
  port: 1025,
});

export const brevoTransporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: parseInt(env.SMTP_PORT as string),
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

if (env.NODE_ENV === "production") {
  brevoTransporter.verify((error) => {
    if (error) {
      logger.error("Error with brevo email connection");
    }
  });
} else {
  mailHogTransporter.verify((error) => {
    if (error) {
      logger.error("Error with mailhog email connection");
    }
  });
}
