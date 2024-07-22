import { Context } from "hono";

import { users } from "@/db/orm";
import { hash } from "@/utils/bcrypt";
import { generateToken } from "@/utils/jwt";
import { verifyAccountEmail } from "@/utils/mailer";
import { RegisterBody } from "../schemas/register.schema";

export const register = async (c: Context) => {
  const { email, username, password } = await c.req.json<RegisterBody>();

  const isUsernameExist = await users.get("username", username);
  const isEmailExist = await users.get("email", username);

  if (isUsernameExist || isEmailExist) {
    return c.json({
      succes: false,
      message: "User with given email/username already exist!",
    });
  }

  const verifyToken = await generateToken(3600, { email: email });

  const newUser = await users.create({
    username,
    email,
    password: hash(password),
    currentVerifyToken: verifyToken,
  });

  await verifyAccountEmail(newUser?.username!, newUser?.email!, verifyToken);

  return c.json({
    success: true,
    message: "An email sent successfully, please verify your account!",
  });
};
