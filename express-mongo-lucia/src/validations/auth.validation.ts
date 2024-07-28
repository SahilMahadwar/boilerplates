import Joi from "joi";

const otpLogin = {
  body: Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.number().required(),
  }),
};

const generateOtp = {
  body: Joi.object({
    email: Joi.string().email().required(),
  }),
};

export const authValidations = { otpLogin, generateOtp };
