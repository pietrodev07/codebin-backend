import { Context } from "hono";
import { setCookie } from "hono/cookie";
import { RegisterBody } from "../schemas/register.schema";
import { compare } from "../../../shared/utils/bcrypt/compare";
import { getUserByUsername, updateUser } from "../../../shared/db/orm/users";
import { generateToken } from "../../../shared/utils/jwt/create";

export const login = async (c: Context) => {
  const { username, password } = await c.req.json<RegisterBody>();

  const fetchedUser = await getUserByUsername(username);
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

  const accessToken = await generateToken(3600, {
    username: username,
  });

  setCookie(c, "access_token", accessToken, {
    secure: true,
    httpOnly: true,
    maxAge: 3600,
  });

  return c.json({
    success: true,
    message: "Login completed successfully!",
    data: { username: username, token: accessToken },
  });
};
