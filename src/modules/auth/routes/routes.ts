import { RoutesData } from "../../../shared/types";
import { registerBodySchema } from "../schemas/register.schema";

export const routes: RoutesData = {
  register: {
    method: "POST",
    path: "/register",
    validator: registerBodySchema,
  },
  verifyAccount: {
    method: "GET",
    path: "/verify",
  },
};
