import { RoutesData } from "../../../shared/types";
import { forgotPasswordBodySchema } from "../schemas/forgot.schema";
import { loginBodySchema } from "../schemas/login.schema";
import { registerBodySchema } from "../schemas/register.schema";

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
  verifyAccount: {
    method: "GET",
    path: "/verify",
  },
};
