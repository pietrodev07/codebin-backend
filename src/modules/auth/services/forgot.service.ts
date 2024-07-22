import { Context } from "hono";

import { users } from "@/db/orm";
import { generateToken } from "@/utils/jwt";
import { resetPasswordEmail, verifyAccountEmail } from "@/utils/mailer";

export const forgotPassword = async (c: Context) => {
  const { email } = await c.req.json();

  const fetchedUser = await users.get("email", email);
  if (!fetchedUser) {
    return c.json({
      success: false,
      message: "User with given email does not exist!",
    });
  }

  if (!fetchedUser.verified) {
    if (fetchedUser.currentVerifyToken) {
      return c.json({
        success: false,
        message: "Please verify your account to login into your account!",
      });
    } else {
      const verifyToken = await generateToken(3600, {
        email: fetchedUser.email,
        id: fetchedUser.id,
      });

      await users.edit(fetchedUser.id, { currentVerifyToken: verifyToken });
      await verifyAccountEmail(
        fetchedUser.username,
        fetchedUser.email,
        verifyToken
      );

      return c.json({
        success: false,
        message: "An email sent successfully, please verify your account!",
      });
    }
  }

  const resetToken = await generateToken(3600, {
    email: fetchedUser.email,
    id: fetchedUser.id,
  });

  await users.edit(fetchedUser.id, { currentResetToken: resetToken });
  await resetPasswordEmail(fetchedUser.username, fetchedUser.email, resetToken);

  return c.json({
    success: true,
    message: "An email sent successfully, please reset your password!",
  });
};
