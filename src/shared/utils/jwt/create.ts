import { sign } from "hono/jwt";

export const generateToken = async (exp: number, fields?: object) => {
  const iat = Math.floor(Date.now() / 1000);

  const payload = {
    ...fields,
    iat,
    exp: iat + exp,
  };

  return await sign(payload, process.env.JWT_SECRET_KEY as string);
};
