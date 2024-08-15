import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";

export const loginRoute = new Hono().get("/login/:id", async (c) => {
  return c.json({ data: "This is login" }, 201);
});

export const SignupRoute = new Hono().post("/login", async (c) => {
  const user = true;

  if (user) {
    throw new HTTPException(401, { message: "Custom error message" });
  }

  return c.json({ asdasdasdxcvxcv: "This is login" }, 201);
});
