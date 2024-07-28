import { SendMailOptions } from "nodemailer";

import {
  brevoTransporter,
  mailHogTransporter,
} from "../configs/nodemailer.config";
import { env } from "../utils/env.util";

export const sendMail = async (mailOptions: SendMailOptions) => {
  if (env.NODE_ENV === "production") {
    return await brevoTransporter.sendMail(mailOptions);
  } else {
    return await mailHogTransporter.sendMail(mailOptions);
  }
};
