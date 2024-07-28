import { otpTemplate } from "../emails/otp-template";
import { OTP } from "../models/otp.model";
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
