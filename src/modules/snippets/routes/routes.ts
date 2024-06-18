import { RoutesData } from "../../../shared/types";
import { createSnippetBodySchema } from "../schemas/create.schema";
import { updateSnippetBodySchema } from "../schemas/update.schema";

export const routes: RoutesData = {
  createSnippetService: {
    path: "/",
    method: "POST",
    validator: createSnippetBodySchema,
  },
  updateSnippetService: {
    path: "/:id",
    method: "PUT",
    validator: updateSnippetBodySchema,
  },
  deleteSnippetService: {
    path: "/:id",
    method: "DELETE",
  },
  getSnippetsService: {
    path: "/",
    method: "GET",
  },
  getSnippetService: {
    path: "/:id",
    method: "GET",
  },
};
