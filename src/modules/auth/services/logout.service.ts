import { Context } from "hono";
import { deleteCookie } from "hono/cookie";

export const logout = (c: Context) => {
  deleteCookie(c, "access_token");

  c.json({
    success: true,
    message: "Logout completed successfully",
  });
};
