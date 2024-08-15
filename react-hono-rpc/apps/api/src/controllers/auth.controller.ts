import { Context } from "hono";

export const bookPermalink = (c: Context) => {
  const id = c.req.param(""); // Can't infer the path param
  return c.json(`get ${id}`);
};
