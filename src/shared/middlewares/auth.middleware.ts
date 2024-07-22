import { Context, Next } from "hono";
import { getCookie } from "hono/cookie";

import { users } from "@/db/orm";
import { handleTokenErrors, verifyToken } from "@/utils/jwt";

export const authMiddleware = async (c: Context, next: Next) => {
  const token = getCookie(c, "access_token");

  try {
    if (!token) {
      return c.json({
        success: false,
        message: "Not authorized!",
      });
    }

    const decoded = await verifyToken(token);

    const fetchedUser = await users.get("username", decoded.username as string);
    if (!fetchedUser) {
      return c.json({
        success: false,
        message: "Not authorized!",
      });
    }

    c.set("user_data", {
      id: fetchedUser?.id,
      email: fetchedUser?.email,
      username: fetchedUser?.username,
    });

    await next();
  } catch (err) {
    const errorResponse = handleTokenErrors(err);
    return c.json(errorResponse);
  }
};
