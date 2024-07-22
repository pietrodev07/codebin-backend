import { RoutesData } from "@/types/*";
import { loginBodySchema } from "../schemas/login.schema";
import { registerBodySchema } from "../schemas/register.schema";
import { resetPasswordBodySchema } from "../schemas/reset.schema";
import { forgotPasswordBodySchema } from "../schemas/forgot.schema";

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
  logout: {
    method: "GET",
    path: "/logout",
  },
};
