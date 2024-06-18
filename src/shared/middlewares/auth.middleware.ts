import { Context, Next } from "hono";
import { JwtTokenExpired, JwtTokenInvalid } from "hono/utils/jwt/types";
import { getCookie } from "hono/cookie";
import { verifyToken } from "../utils/jwt/verify";
import { getUserByUsername } from "../db/orm/users";

export const authMiddleware = async (c: Context, next: Next) => {
  const token = getCookie(c, "access_token");

  try {
    if (!token) {
      return c.json({
        success: false,
        message: "The token given, is invalid!",
      });
    }

    const decoded = await verifyToken(token);
    const fetchedUser = await getUserByUsername(decoded.username as string);
    if (!fetchedUser) {
      return c.json({
        success: false,
        message: "The token given, is invalid!",
      });
    }

    c.set("user_data", {
      id: fetchedUser?.id,
      email: fetchedUser?.email,
      username: fetchedUser?.username,
    });

    return await next();
  } catch (err) {
    if (err instanceof JwtTokenExpired) {
      return c.json({ success: false, message: "The token is expired!" });
    }

    if (err instanceof JwtTokenInvalid) {
      return c.json({ success: false, message: "The token is invalid!" });
    }
  }
};
