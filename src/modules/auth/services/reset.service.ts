import { Context } from "hono";
import { users } from "@/db/orm";
import { handleTokenErrors, verifyToken } from "@/utils/jwt";
import { ResetPasswordBody } from "../schemas/reset.schema";
import { hash } from "@/utils/bcrypt";

export const resetPassword = async (c: Context) => {
  const { email, token } = c.req.query();
  const { password } = await c.req.json<ResetPasswordBody>();

  try {
    const decoded = await verifyToken(token);

    if (decoded.email != email) {
      return c.json({
        success: false,
        message: "The token/email given is invalid!",
      });
    }

    const fetchedUser = await users.get("email", email);
    if (!fetchedUser) {
      return c.json({
        success: false,
        message: "The token/email given is invalid!",
      });
    }

    if (token != fetchedUser.currentResetToken) {
      return c.json({
        success: false,
        message: "The token/email given is invalid!",
      });
    }

    await users.edit(fetchedUser.id, {
      password: hash(password),
      currentResetToken: "",
    });

    return c.json({
      success: false,
      message: "Password resetted successfully!",
    });
  } catch (err) {
    const errorResponse = handleTokenErrors(err);
    return c.json(errorResponse);
  }
};
