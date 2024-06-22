import { RoutesData } from "@/types/index";
import { createSnippetBodySchema } from "../schemas/create.schema";
import { updateSnippetBodySchema } from "../schemas/update.schema";

export const routes: RoutesData = {
  createSnippetService: {
    path: "/private",
    method: "POST",
    validator: createSnippetBodySchema,
  },
  updateSnippetService: {
    path: "/private/:id",
    method: "PUT",
    validator: updateSnippetBodySchema,
  },
  deleteSnippetService: {
    path: "/private/:id",
    method: "DELETE",
  },
  getSnippetsService: {
    path: "/private",
    method: "GET",
  },
  getSnippetService: {
    path: "/private/:id",
    method: "GET",
  },
  getPublicSnippetService: {
    path: "/public/:id",
    method: "GET",
  },
};
