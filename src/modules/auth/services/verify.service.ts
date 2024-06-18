import { Context } from "hono";
import { JwtTokenExpired, JwtTokenInvalid } from "hono/utils/jwt/types";
import { verifyToken } from "../../../shared/utils/jwt/verify";
import { getUserByEmail, updateUser } from "../../../shared/db/orm/users";

export const verifyAccount = async (c: Context) => {
  const { email, token } = c.req.query();

  try {
    const decoded = await verifyToken(token);

    if (decoded.email != email) {
      return c.json({
        success: false,
        message: "The token/email given, is invalid!",
      });
    }

    const fetchedUser = await getUserByEmail(decoded.email as string);
    if (!fetchedUser) {
      return c.json({
        success: false,
        message: "The token/email given, is invalid!",
      });
    }

    if (token != fetchedUser.currentVerifyToken) {
      return c.json({
        success: false,
        message: "The token/email given, is invalid!",
      });
    }

    await updateUser(fetchedUser?.id!, {
      verified: true,
      currentVerifyToken: "",
    });

    return c.json({
      success: false,
      message: "Account verified successfully!",
    });
  } catch (err) {
    if (err instanceof JwtTokenExpired) {
      return c.json({ success: false, message: "The token is expired!" });
    }

    if (err instanceof JwtTokenInvalid) {
      return c.json({ success: false, message: "The token is invalid!" });
    }
  }
};
