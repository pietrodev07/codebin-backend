import { routes } from "./routes";
import { generateRouter } from "@/utils/router";
import { utilsController } from "../controllers/utils.controller";

export const utilsRouter = generateRouter(routes, utilsController);
