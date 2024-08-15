import { AppType } from "api";
import { hc } from "hono/client";

export const api = hc<AppType>("http://localhost:3000");
