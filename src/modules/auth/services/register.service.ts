import { Context } from "hono";
import { hash } from "../../../shared/utils/bcrypt/hash";
import { generateToken } from "../../../shared/utils/jwt/create";
import { RegisterBody } from "../schemas/register.schema";
import {
  createUser,
  getUserByEmail,
  getUserByUsername,
  updateUser,
} from "../../../shared/db/orm/users";

export const register = async (c: Context) => {
  const { email, username, password } = await c.req.json<RegisterBody>();

  const isUsernameExist = await getUserByUsername(username);
  const isEmailExist = await getUserByEmail(email);

  if (isUsernameExist || isEmailExist) {
    return c.json({
      succes: false,
      message: "User with given email/username already exist!",
    });
  }

  const newUser = await createUser({
    username,
    email,
    password: hash(password),
  });

  const verifyToken = await generateToken(3600, {
    email: newUser?.email,
    id: newUser?.id,
  });

  await updateUser(newUser?.id!, { currentVerifyToken: verifyToken });

  return c.json({
    success: true,
    message: "An email sent successfully, please verify your account!",
    token: verifyToken,
  });
};
