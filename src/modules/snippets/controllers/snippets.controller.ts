import { createSnippetService } from "../services/create.service";
import { deleteSnippetService } from "../services/delete.service";
import { getSnippetsService } from "../services/get-all.service";
import { updateSnippetService } from "../services/update.service";

export const snippetsController = {
  createSnippetService,
  updateSnippetService,
  deleteSnippetService,
  getSnippetsService,
};
