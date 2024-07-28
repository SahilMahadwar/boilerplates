import express from "express";
import { authRouter } from "./auth.route";
import { userRouter } from "./user.route";

export const routes = express.Router();

routes.get("/status", (req, res) => res.send("OK"));

// users
routes.use("/users", userRouter);

// auth
routes.use("/auth", authRouter);
