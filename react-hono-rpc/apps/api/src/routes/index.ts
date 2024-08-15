import { Hono } from "hono";
import { authRoutes } from "./auth.routes";

const app = new Hono();

export const routes = app.route("/auth", authRoutes);
