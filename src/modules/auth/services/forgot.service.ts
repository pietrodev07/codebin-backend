import { Context } from "hono";
import { ForgotPasswordBody } from "../schemas/forgot.schema";
import { getUserByEmail, updateUser } from "../../../shared/db/orm/users";
import { generateToken } from "../../../shared/utils/jwt/create";

export const forgotPassword = async (c: Context) => {
  const { email } = await c.req.json<ForgotPasswordBody>();

  const fetchedUser = await getUserByEmail(email);
  if (!fetchedUser) {
    return c.json({
      success: false,
      message: "User with given email does not exist!",
    });
  }

  if (!fetchedUser.verified && !fetchedUser.currentVerifyToken) {
    const verifyToken = await generateToken(3600, {
      email: fetchedUser.email,
      id: fetchedUser?.id,
    });

    await updateUser(fetchedUser?.id, { currentVerifyToken: verifyToken });

    return c.json({
      success: false,
      message: "An email sent successfully, please verify your account!",
      token: verifyToken,
    });
  }

  if (!fetchedUser.verified && fetchedUser.currentVerifyToken) {
    return c.json({
      success: false,
      message: "Please verify your account to login into your account!",
    });
  }

  const resetToken = await generateToken(3600, {
    email: fetchedUser.email,
    id: fetchedUser?.id,
  });

  await updateUser(fetchedUser?.id!, { currentResetToken: resetToken });

  return c.json({
    success: true,
    message: "An email sent successfully, please reset your password!",
    token: resetToken,
  });
};
