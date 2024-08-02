import Joi from "joi";
import { objectIdRegex } from "../utils/common.util";

const getUserById = {
  params: Joi.object({
    id: Joi.string().pattern(objectIdRegex).required().messages({
      "string.pattern.base": "id must be a valid ObjectId",
    }),
  }),
};

export const userValidations = { getUserById };
