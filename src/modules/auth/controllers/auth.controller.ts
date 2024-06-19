import { forgotPassword } from "../services/forgot.service";
import { login } from "../services/login.service";
import { logout } from "../services/logout.service";
import { me } from "../services/me.service";
import { register } from "../services/register.service";
import { resetPassword } from "../services/reset.service";
import { verifyAccount } from "../services/verify.service";

export const authController = {
  register,
  verifyAccount,
  login,
  forgotPassword,
  resetPassword,
  me,
  logout,
};
