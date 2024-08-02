import express from "express";
import { validate } from "express-validation";

import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/user.controller";

import { roles } from "../constants/auth.constants";
import protectedRoute from "../middlewares/protected-route.middleware";
import { userValidations } from "../validations/user.validation";

export const userRouter = express.Router();

userRouter
  .route("/")
  .post(protectedRoute([roles.admin]), createUser)
  .get(protectedRoute([roles.admin]), getUsers);

userRouter
  .route("/:id")
  .get(
    validate(userValidations.getUserById),
    protectedRoute([roles.admin]),
    getUserById
  )
  .put(protectedRoute(), updateUser)
  .delete(protectedRoute(), deleteUser);
