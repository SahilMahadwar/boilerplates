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

const deleteUserSession = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};

export const authValidations = { otpLogin, generateOtp, deleteUserSession };
