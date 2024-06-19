import { Context } from "hono";
import { JwtTokenExpired, JwtTokenInvalid } from "hono/utils/jwt/types";
import { ResetPasswordBody } from "../schemas/reset.schema";
import { verifyToken } from "@/utils/jwt/verify";
import { getUserByEmail, updateUser } from "@/db/orm/users";
import { compare } from "@/utils/bcrypt/compare";
import { hash } from "@/utils/bcrypt/hash";

export const resetPassword = async (c: Context) => {
  const { email, token } = c.req.query();
  const { password } = await c.req.json<ResetPasswordBody>();

  try {
    const decoded = await verifyToken(token);

    if (decoded.email != email) {
      return c.json({
        success: false,
        message: "The token/email given, is invalid!",
      });
    }

    const fetchedUser = await getUserByEmail(decoded.email as string);
    if (!fetchedUser) {
      return c.json({
        success: false,
        message: "The token/email given, is invalid!",
      });
    }

    if (token != fetchedUser.currentResetToken) {
      return c.json({
        success: false,
        message: "The token/email given, is invalid!",
      });
    }

    const passwordMatch = compare(fetchedUser?.password!, password);
    if (passwordMatch) {
      return c.json({
        success: false,
        message: "The new password given, is the same of the old password!",
      });
    }

    await updateUser(fetchedUser?.id!, {
      password: hash(password),
      currentResetToken: "",
    });

    return c.json({
      success: false,
      message: "Password resetted successfully!",
    });
  } catch (err) {
    if (err instanceof JwtTokenExpired) {
      return c.json({ success: false, message: "The token is expired!" });
    }

    if (err instanceof JwtTokenInvalid) {
      return c.json({ success: false, message: "The token is invalid!" });
    }
  }
};
