import parser from "ua-parser-js";
import { lucia } from "../configs/lucia.config";
import { otpTemplate } from "../emails/otp-template";
import { OTP } from "../models/otp.model";
import { formatIp, getIpData } from "../utils/ip-util";
import { sendMail } from "./email.service";

export const generateAndSendOtp = async ({ email }: { email: string }) => {
  // Generate OTP
  const generateOTP = Math.floor(1000 + Math.random() * 9000);

  // Create OTP record
  const otpRecord = await OTP.create({
    email: email,
    otp: generateOTP,
  });

  // Send mail
  const mailOptions = {
    from: 'Express" <no-reply@express.com>',
    to: email,
    subject: "Verify Email",
    html: otpTemplate({ otp: parseInt(otpRecord.otp) }),
  };

  const emailStatus = await sendMail(mailOptions);

  if (emailStatus.accepted.length > 0) {
    return emailStatus.accepted[0];
  } else {
    return false;
  }
};

export const validateOTP = async ({
  email,
  otp,
}: {
  email: string;
  otp: number;
}) => {
  // Find the OTP record for the given email
  const otpRecord = await OTP.findOne({ email: email, otp: otp });

  if (!otpRecord) {
    return false;
  }

  // Check if the OTP has not expired
  const currentTime = new Date();

  if (otpRecord.expiresAt < currentTime) {
    return false;
  }

  // Remove the OTP document from the database so it can't be used more than once
  await OTP.deleteOne({ email: email, otp: otp });

  return true;
};

export const createSession = async ({
  ip,
  rawUa,
  userId,
}: {
  ip: string | undefined;
  rawUa: string;
  userId: string;
}) => {
  // Get Ip data
  const ipInfo = await getIpData({ ip: ip });

  // Parse user agent
  const ua = parser(rawUa);

  try {
    const session = await lucia.createSession(userId as string, {
      ip: formatIp({ ip: ip }),
      ip_info: ipInfo,
      device_info: {
        ua: ua.ua,
        browser: ua.browser,
        device: ua.device,
        os: ua.os,
      },
      created_at: new Date(),
      updated_at: new Date(),
    });

    return session;
  } catch (error) {
    return false;
  }
};
