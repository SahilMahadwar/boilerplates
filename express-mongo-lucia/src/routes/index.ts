import express from "express";
import { authRouter } from "./auth.route";
import { userRouter } from "./user.route";

export const routes = express.Router();

routes.get("/status", (req, res) => res.send("OK"));

// For quick tests
routes.get("/test", (req, res) => {
  res.respond({ data: "test route", statusCode: 200 });
});

// users
routes.use("/users", userRouter);

// auth
routes.use("/auth", authRouter);
