import { RoutesData } from "../../../shared/types";
import { forgotPasswordBodySchema } from "../schemas/forgot.schema";
import { loginBodySchema } from "../schemas/login.schema";
import { registerBodySchema } from "../schemas/register.schema";
import { resetPasswordBodySchema } from "../schemas/reset.schema";

export const routes: RoutesData = {
  register: {
    method: "POST",
    path: "/register",
    validator: registerBodySchema,
  },
  login: {
    method: "POST",
    path: "/login",
    validator: loginBodySchema,
  },
  forgotPassword: {
    method: "POST",
    path: "/forgot",
    validator: forgotPasswordBodySchema,
  },
  resetPassword: {
    method: "POST",
    path: "/reset",
    validator: resetPasswordBodySchema,
  },
  verifyAccount: {
    method: "GET",
    path: "/verify",
  },
  me: {
    method: "GET",
    path: "/me",
  },
};
