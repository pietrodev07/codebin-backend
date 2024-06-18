import { register } from "../services/register.service";
import { verifyAccount } from "../services/verify.service";

export const authController = {
  register,
  verifyAccount,
};
