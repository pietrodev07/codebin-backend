import { routes } from "./routes";
import { generateRouter } from "@/utils/router";
import { snippetsController } from "../controllers/snippets.controller";

export const snippetsRouter = generateRouter(routes, snippetsController);
