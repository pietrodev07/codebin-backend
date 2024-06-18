import { routes } from "./routes";
import { snippetsController } from "../controllers/snippets.controller";
import { generateRouter } from "../../../shared/utils/generateRouter";

export const snippetsRoutes = generateRouter(routes, snippetsController);
