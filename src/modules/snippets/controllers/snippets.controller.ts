import { createSnippetService } from "../services/create.service";
import { deleteSnippetService } from "../services/delete.service";
import { getSnippetsService } from "../services/get-all.service";
import { getPublicSnippetService } from "../services/get-public.service";
import { getSnippetService } from "../services/get.service";
import { updateSnippetService } from "../services/update.service";

export const snippetsController = {
  createSnippetService,
  updateSnippetService,
  deleteSnippetService,
  getSnippetsService,
  getSnippetService,
  getPublicSnippetService,
};
