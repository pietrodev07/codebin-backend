import { me } from "../services/me.service";
import { login } from "../services/login.service";
import { logout } from "../services/logout.service";
import { register } from "../services/register.service";
import { resetPassword } from "../services/reset.service";
import { verifyAccount } from "../services/verify.service";
import { forgotPassword } from "../services/forgot.service";

export const authController = {
  me,
  login,
  logout,
  register,
  verifyAccount,
  resetPassword,
  forgotPassword,
};
