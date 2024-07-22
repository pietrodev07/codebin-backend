import { editSnippet } from "../services/update.service";
import { getSnippets } from "../services/get-all.service";
import { createSnippet } from "../services/create.service";
import { deleteSnippet } from "../services/delete.service";
import { getPrivateSnippet } from "../services/get.service";
import { getPublicSnippet } from "../services/get-public.service";

export const snippetsController = {
  editSnippet,
  getSnippets,
  createSnippet,
  deleteSnippet,
  getPublicSnippet,
  getPrivateSnippet,
};
