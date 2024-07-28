import Joi from "joi";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const getUserById = {
  params: Joi.object({
    id: Joi.string().pattern(objectIdRegex).required().messages({
      "string.pattern.base": "id must be a valid ObjectId",
    }),
  }),
};

export const userValidations = { getUserById };
