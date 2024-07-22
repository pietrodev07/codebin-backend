import { Context } from "hono";

export const me = (c: Context) => {
  return c.json({
    success: true,
    message: "Authorized!",
  });
};
