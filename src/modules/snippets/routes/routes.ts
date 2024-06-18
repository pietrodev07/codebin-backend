import { RoutesData } from "../../../shared/types";
import { createSnippetBodySchema } from "../schemas/create.schema";

export const routes: RoutesData = {
  createSnippetService: {
    path: "/",
    method: "POST",
    validator: createSnippetBodySchema,
  },
};
