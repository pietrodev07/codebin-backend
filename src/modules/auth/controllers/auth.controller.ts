import { login } from "../services/login.service";
import { register } from "../services/register.service";
import { verifyAccount } from "../services/verify.service";

export const authController = {
  register,
  verifyAccount,
  login,
};
