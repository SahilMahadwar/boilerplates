import { Hono } from "hono";
import { loginRoute, SignupRoute } from "./auth/login";

export const authRoutes = new Hono()

  .route("/", loginRoute)
  .route("/", SignupRoute);
