import { sign, verify } from "hono/jwt";
import { JwtTokenExpired, JwtTokenInvalid } from "hono/utils/jwt/types";

export const generateToken = async (exp: number, fields?: object) => {
  const iat = Math.floor(Date.now() / 1000);

  const payload = {
    ...fields,
    iat,
    exp: iat + exp,
  };

  return await sign(payload, process.env.JWT_SECRET_KEY as string);
};

export const verifyToken = async (token: string) => {
  return await verify(token, process.env.JWT_SECRET_KEY as string);
};

export const handleTokenErrors = (err: unknown) => {
  if (err instanceof JwtTokenExpired) {
    return { success: false, messgae: "The token is expired!" };
  }

  if (err instanceof JwtTokenInvalid) {
    return { success: false, message: "The token is invalid!" };
  }
};
