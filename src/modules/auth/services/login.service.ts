import { Context } from "hono";
import { setCookie } from "hono/cookie";

import { users } from "@/db/orm";
import { compare } from "@/utils/bcrypt";
import { generateToken } from "@/utils/jwt";
import { verifyAccountEmail } from "@/utils/mailer";
import { RegisterBody } from "../schemas/register.schema";

export const login = async (c: Context) => {
  const { username, password } = await c.req.json<RegisterBody>();

  const fetchedUser = await users.get("username", username);
  if (!fetchedUser) {
    return c.json({
      success: false,
      message: "User with given username does not exist!",
    });
  }

  const passwordMatch = compare(fetchedUser.password, password);
  if (!passwordMatch) {
    return c.json({
      success: false,
      message: "Password given is not valid for this username!",
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

  const accessToken = await generateToken(3600, { username });

  setCookie(c, "access_token", accessToken, {
    path: "/",
    secure: true,
    httpOnly: true,
    maxAge: 3600,
  });

  return c.json({
    success: true,
    message: "Login completed successfully!",
    data: { accessToken },
  });
};
