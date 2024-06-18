import { verify } from "hono/jwt";

export const verifyToken = async (token: string) => {
  return await verify(token, process.env.JWT_SECRET_KEY as string);
};
