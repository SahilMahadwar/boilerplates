import express from "express";
import { validate } from "express-validation";

import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/user.controller";

import protectedRoute from "../middlewares/protected-route.middleware";
import { userValidations } from "../validations/user.validation";

export const userRouter = express.Router();

userRouter.route("/").post(protectedRoute(), createUser).get(getUsers);

userRouter
  .route("/:id")
  .get(validate(userValidations.getUserById), getUserById)
  .put(protectedRoute(), updateUser)
  .delete(protectedRoute(), deleteUser);
