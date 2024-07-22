import { RoutesData } from "@/types/*";
import { createSnippetBodySchema } from "../schemas/create.schema";
import { updateSnippetBodySchema } from "../schemas/update.schema";

export const routes: RoutesData = {
  createSnippet: {
    path: "/private",
    method: "POST",
    validator: createSnippetBodySchema,
  },
  editSnippet: {
    path: "/private/:id",
    method: "PUT",
    validator: updateSnippetBodySchema,
  },
  deleteSnippet: {
    path: "/private/:id",
    method: "DELETE",
  },
  getSnippets: {
    path: "/private",
    method: "GET",
  },
  getPrivateSnippet: {
    path: "/private/:id",
    method: "GET",
  },
  getPublicSnippet: {
    path: "/:id",
    method: "GET",
  },
};
