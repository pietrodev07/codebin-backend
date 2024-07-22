import { RoutesData } from "@/types/*";
import { contactBodySchema } from "../schemas/contact.schema";

export const routes: RoutesData = {
  contact: {
    method: "POST",
    path: "/contact",
    validator: contactBodySchema,
  },
};
